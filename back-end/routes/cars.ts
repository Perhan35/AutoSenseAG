/** 
 * File: cars.ts 
 * Desc: handle cars route
 * Dev: Perhan Scudeller
 * Company: AutoSense AG
 * License: 
 */

 /** Imports & config */
import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import { nextTick } from 'process';
const cars : express.Application = express();
var AWS = require("aws-sdk");
AWS.config.update({region: 'eu-central-1'}); //Central Europe
var dynamodb = new AWS.DynamoDB();

//load config for DB connexion
AWS.config.getCredentials(function(err:any) {
    if (err) console.log(err.stack); // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId); // for debug only, TODO : delete before prod
      console.log("Region: ", AWS.config.region);                     // for debug only, TODO : delete before prod
    }
});

cars.use(bodyParser.urlencoded({extended:false}));


/**  GET  */

/** get every cars */
cars.get("/getall",(req,res) => {
  /** Object Model */
  var params = {
    TableName: "cars" ,
    ProjectionExpression: "#id, #name, #vin, #make, #model, #year, #fuelType, #type, #Position, #odometer, #fuel, #battery",
    ExpressionAttributeNames: {
      "#id": "id",
      "#name": "name",
      "#vin": "vin",
      "#make": "make",
      "#model": "model",
      "#year": "year",
      "#fuelType": "fuelType",
      "#type": "type",
      "#Position": "Position",
      "#odometer": "odometer",
      "#fuel": "fuel",
      "#battery": "battery"
    }
  };
  /** Querying Database & sending result as a JSON */
  dynamodb.scan(params, function (err:any, data:any) {
    if (err) console.log(err, err.stack); // an error occurred
    else { // successful response
      console.log(data); // for debug only, TODO : delete before prod
      res.json(data);
    }           
  });
});

/** get car by id */ 
cars.get("/getbyid",(req,res) => {
  /** TODO */
});


/** ADD */

/** add a car */
cars.post("/add",(req,res) => {
  let _uid:number = Date.now(); //generates a random unique ID
  /** Object Model */
  // TODO : check if all needed params are in the request body & every params are correct (format, no SQL injection, etc)
  let item = {
    'id' : {'N': _uid.toString()},
    'name': {'S': req.body.name},
    'vin': {'S': req.body.vin},
    'make': {'S': req.body.make},
    'model': {'S': req.body.model},
    'year': {'S': req.body.year},
    'fuelType': {'S': req.body.fuelType},
    'type': {'S': req.body.type},
    'Position': {'M': {
      'lat': {'N': req.body.lat},
      'long': {'N': req.body.long}
    }},
    'odometer': {'N': req.body.odometer},
    'fuel': {'N': req.body.fuel},
    'battery': {'N': req.body.battery}
  }
  /** Inserting into Database */
  dynamodb.putItem({
    'TableName' : 'cars',
    'Item': item,
    'Expected': { id: {Exists: false}}
  }, function(err:any, data:any){
    if(err){
      var returnStatus = 500;
      if (err.code === 'ConditionalCheckFailedException') { //id is not unique
        returnStatus = 409;
      }
    res.json({"Success": false, "Message": "Car couldn't be added"});
    res.status(returnStatus).end();
    console.log('DDB Error: ' + err);
    }else{
      console.log("New car added!"); // for debug only, TODO : delete before prod
      res.json({"Success": true, "Message": "Car successfully added!"});
    }
  });
});



/** UPDATE */

/** update a car */ /** TODO : allow to change multiple params at a time */
cars.put("/update",(req,res) => {
  let key = {
    'id' : {'N' : req.query.id}
  }
  let paramToUpdate:string;
  let newValue:object;
  if(req.query.name){
    paramToUpdate = "name";
    newValue = {'S': req.query.name};
  }else if(req.query.vin){
    paramToUpdate = "vin";
    newValue = {'S': req.query.vin};
  }else if(req.query.make){
    paramToUpdate = "make";
    newValue = {'S': req.query.make};
  }else if(req.query.model){
    paramToUpdate = "model";
    newValue = {'S': req.query.model};
  }else if(req.query.year){
    paramToUpdate = "year";
    newValue = {'S': req.query.year};
  }else if(req.query.fuelType){
    paramToUpdate = "fuelType";
    newValue = {'S': req.query.fuelType};
  }else if(req.query.type){
    paramToUpdate = "type";
    newValue = {'S': req.query.type};
  }else if(req.query.lat && req.query.long){ // a position is usually updated with its latitude and longitude at the same time
    paramToUpdate = "Position";
    newValue = {'M': {
      'lat': {'N': req.query.lat},
      'long': {'N': req.query.long}
    }};
  }else if(req.query.odometer){
    paramToUpdate = "odometer";
    newValue = {'N': req.query.odometer};
  }else if(req.query.fuel){
    paramToUpdate = "fuel";
    newValue = {'N': req.query.fuel};
  }else if(req.query.battery){
    paramToUpdate = "battery";
    newValue = {'N': req.query.battery};
  }else{ //error
    paramToUpdate = "error";
    newValue = {'S': "ERROR"};
  };
  let attrName = {
    '#N' : paramToUpdate
  };
  let attrValue = {
    ":v" : newValue
  }
  if(paramToUpdate != "error"){ // missing expected parameter
    dynamodb.updateItem({
      'TableName': 'cars',
      'Key': key,
      'ExpressionAttributeNames': attrName,
      'ExpressionAttributeValues': attrValue,
      'UpdateExpression': "SET #N = :v"
      //,'Expected': {id: {Exists: true}}
    }, (err:any,data:any)=>{
      if(err){
        console.log(err, err.stack);
        res.json({"Success": false, "Message": "The car couldn't be updated"});
      }else{
        console.log("Car updated!"); // for debug only, TODO : delete before prod
        res.json({"Success": true, "Message": "Car successfully updated!"});
      }
    });
  }else{
    console.log("Please verify params/query"); // for debug only, TODO : delete before prod
    res.json({"Success": false, "Message": "Something went wrong in the query"});
  }
});



/** DELETE */

/** delete a car */
cars.delete("/delete", (req,res)=>{
  dynamodb.deleteItem({
    'TableName': 'cars',
    'Key': {
      'id': {'N': req.query.id}
    }
  }, (err:any, data:any)=>{      
    if(err){
      console.log(err, err.stack);
      res.json({"Success": false, "Message": "The car couldn't be deleted"});
    }else{
      console.log("Car deleted!"); // for debug only, TODO : delete before prod
      res.json({"Success": true, "Message": "Car successfully deleted!"});
    }
  });
});

module.exports = cars ; 