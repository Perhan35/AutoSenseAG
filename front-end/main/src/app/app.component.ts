import { Component, OnInit } from '@angular/core';
//import { NgModel } from '@angular/forms';
//import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

import { CarService } from './car.service';
import { Car } from './car/car';
import { CarComponent } from './car/car.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** ATTRIBUTS */

  title = 'main';
  carToAddName:string;
  carToAddVin:string;
  carToAddMake:string;
  carToAddModel:string;
  carToAddYear:string;
  carToAddFuelType:string;
  carToAddType:string;
  carToAddLat:string;
  carToAddLon:string;
  carToAddOdometer:string;
  carToAddFuel:string;
  carToAddBattery:string;


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
    // TODO : verify every value and correctness
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
    console.log(carToAdd);

    //Take off (sending)
    this.carService.addCar(carToAdd)
      .subscribe(carToAdd => {
        // Placeholder to find a way to update the liste TODO
      });

    
      //Delete fields for next input
      this.carToAddName = '';
      this.carToAddVin = '';
      this.carToAddMake = '';
      this.carToAddModel = '';
      this.carToAddYear = '';
      this.carToAddFuelType = '';
      this.carToAddType = '';
      this.carToAddLat = '';
      this.carToAddLon = '';
      this.carToAddOdometer = '';
      this.carToAddFuel = '';
      this.carToAddBattery = '';

  }

}
