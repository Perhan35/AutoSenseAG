import { Component, OnInit } from '@angular/core';


import { CarService } from './car.service';
import { Car } from './car/car';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** ATTRIBUTS */

  title = 'main';
  carToAddName:string = undefined;
  carToAddVin:string = undefined;
  carToAddMake:string = undefined;
  carToAddModel:string = undefined;
  carToAddYear:string = undefined;
  carToAddFuelType:string = undefined;
  carToAddType:string = undefined;
  carToAddLat:string = undefined;
  carToAddLon:string = undefined;
  carToAddOdometer:string = undefined;
  carToAddFuel:string = undefined;
  carToAddBattery:string = undefined;


  /** FUNCTIONS */

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    document.getElementById("addCarDisplay").style.display = 'none';
  }


  /** Display the card to add a car */
  addCarDisplay():void{
    document.getElementById("addCarDisplay").style.display = 'block';
  }

  addCarUndisplay():void{
    document.getElementById("addCarDisplay").style.display = 'none';
  }

  /** Add car to the database & push to local car container */
  addCar():void{
    document.getElementById("addCarDisplay").style.display = 'none';
    // TODO : display message like : Car being saved.
    
    // Prepare for take off (query)
    let _uid:number = Date.now(); //generates a random unique ID
    let carToAdd:Car;
    // Verification that all field are filled
    if(!this.carToAddName || !this.carToAddVin  || !this.carToAddMake     ||
      !this.carToAddModel || !this.carToAddYear || !this.carToAddFuelType ||
      !this.carToAddType  || !this.carToAddLat  || !this.carToAddLon      || !this.carToAddOdometer ||
      !this.carToAddFuel  || !this.carToAddBattery){
      // TODO : display error message : Please fill up all fields
    }else{

      carToAdd = {
        'id': {'N' : _uid.toString()},
        'name': {'S' : this.carToAddName},
        'vin': {'S' : this.carToAddVin},
        'make': {'S' : this.carToAddMake},
        'model': {'S' : this.carToAddModel},
        'year': {'S' : this.carToAddYear},
        'fuelType': {'S' : this.carToAddFuelType},
        'type': {'S' : this.carToAddType},
        'Position': { 'M': {
            'lat': {'N' : this.carToAddLat},
            'lon': {'N' : this.carToAddLon}
          }},
        'odometer': {'N' : this.carToAddOdometer},
        'fuel': {'N' : this.carToAddFuel},
        'battery': {'N' : this.carToAddBattery},
      }

      //Take off (sending)
      this.carService.addCar(carToAdd)
        .subscribe(carToAdd => {
          // Placeholder to find a way to update the liste TODO
        });

      
        //Delete fields for next input, only on success
        this.carToAddName = undefined;
        this.carToAddVin = undefined;
        this.carToAddMake = undefined;
        this.carToAddModel = undefined;
        this.carToAddYear = undefined;
        this.carToAddFuelType = undefined;
        this.carToAddType = undefined;
        this.carToAddLat = undefined;
        this.carToAddLon = undefined;
        this.carToAddOdometer = undefined;
        this.carToAddFuel = undefined;
        this.carToAddBattery = undefined;

    }
  }
}
