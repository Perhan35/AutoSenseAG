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
      /**
      console.log("Access key:", AWS.config.credentials.accessKeyId); // for debug only, TODO : delete before prod
      console.log("Region: ", AWS.config.region);                     // for debug only, TODO : delete before prod
       */
    }
});

// For 'update' and 'add' API
cars.use(express.json()); 

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
      res.json(data);
    }           
  });
});

/** get car by id */ 
cars.get("/getbyid",(req,res) => {
  /** TODO? */
});


/** ADD */

/** add a car */
cars.post("/add",(req,res) => {
  /** Object Model */
  // TODO : check if all needed params are in the request body & every params are correct (format, no SQL injection, etc)
  let item = {
    'id' : {'N': req.body.id.N},
    'name': {'S': req.body.name.S},
    'vin': {'S': req.body.vin.S},
    'make': {'S': req.body.make.S},
    'model': {'S': req.body.model.S},
    'year': {'S': req.body.year.S},
    'fuelType': {'S': req.body.fuelType.S},
    'type': {'S': req.body.type.S},
    'Position': { 'M': req.body.Position.M},
    'odometer': {'N': req.body.odometer.N},
    'fuel': {'N': req.body.fuel.N},
    'battery': {'N': req.body.battery.N}
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
      res.json({
        "Success": false, 
        "Message": "Car couldn't be added"
      //, 'Item' : TODO : send the added item back
      });
      res.status(returnStatus).end();
      console.log('DDB Error: ' + err);
    }else{
      //console.log("New car added!"); // for debug only, TODO : delete before prod
      res.json({"Success": true, "Message": "Car successfully added!", "Item": item});
    }
  });
});



/** UPDATE */

/** update a car */
cars.put("/update",(req,res) => {
  
  let paramWrong = (req.body.id.N) ? true : false ; /** TODO : check first if ALL required params are in the body */
  
  let key = {
    'id' : {'N' : req.body.id.N}
  }

  let attrName = {
    "#N": "name",
    "#V": "vin",
    "#Ma": "make",
    "#Mo": "model",
    "#Y": "year",
    "#FT": "fuelType",
    "#T": "type",
    "#La": "lat",
    "#Lo": "lon",
    "#O": "odometer",
    "#F": "fuel",
    "#B": "battery"
  }

  let attrValue = {
    ":n": req.body.name,
    ":v": req.body.vin,
    ":ma": req.body.make,
    ":mo": req.body.model,
    ":y": req.body.year,
    ":ft": req.body.fuelType,
    ":t": req.body.type,
    ":la": req.body.Position.M.lat,
    ":lo": req.body.Position.M.lon,
    ":o": req.body.odometer,
    ":f": req.body.fuel,
    ":b": req.body.battery
  }


  if(paramWrong){ // missing expected parameter
    dynamodb.updateItem({
      'TableName': 'cars',
      'Key': key,
      'ExpressionAttributeNames': attrName,
      'ExpressionAttributeValues': attrValue,
      'UpdateExpression': "SET #N = :n, #V = :v, #Ma = :ma, #Mo = :mo, #Y = :y, #FT = :ft, #T = :t, #La = :la, #Lo = :lo, #O = :o, #F = :f, #B = :b"
      //,'Expected': {id: {Exists: true}} // TODO
    }, (err:any,data:any)=>{
      if(err){
        console.log(err, err.stack);
        res.json({"Success": false, "Message": "The car couldn't be updated"});
      }else{
        //console.log("Car updated!"); // for debug only, TODO : delete before prod
        res.json({"Success": true, "Message": "Car successfully updated!"});
      }
    });
  }else{
    //console.log("Please verify params/query"); // for debug only, TODO : delete before prod
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
      res.json({"Success": true, "Message": "Car successfully deleted!"});
    }
  });
});

module.exports = cars ; 