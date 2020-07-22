import { Component, OnInit, Input } from '@angular/core';

import { CarService } from '../car.service';
import { Car } from './car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {

  private cars: Car[] = [];
  private carToDeleteObj:Car;
  private editCar: Car; // the car currently being edited
  queryOngoing: boolean = false; // to know if there is an ongoing query to the server

  /* FOR DEV ONLY */
  /**
  cars: Car[] = 
  [{
    "model":{"S":"clioII"},
    "vin":{"S":"HEllo"},
    "year":{"S":"2008"},
    "fuel":{"N":"35"},
    "fuelType":{"S":"diesel"},
    "Position":{"M":{"lat":{"N":"47.46423"},"lon":{"N":"8.311234"}}},
    "id":{"N":"1595165735158"},
    "name":{"S":"perhanscar"},
    "battery":{"N":"12.5"},
    "make":{"S":"Renault"},
    "odometer":{"N":"235000"},
    "type":{"S":"city"}
  },
    {"model":{"S":"clioII"},
    "vin":{"S":"DF662BN"},
    "year":{"S":"2008"},
    "fuel":{"N":"35"},
    "fuelType":{"S":"diesel"},
    "Position":{"M":{"lat":{"N":"47.46423"},"lon":{"N":"8.311234"}}},
    "id":{"N":"670"},
    "name":{"S":"perhanscar"},
    "battery":{"N":"12.5"},
    "make":{"S":"Renault"},
    "odometer":{"N":"235000"},
    "type":{"S":"city"}
  },
    {"model":{"S":"CX-5"},
    "vin":{"S":"ASD423E3D3RF5"},
    "year":{"S":"2019"},
    "fuel":{"N":"33.4"},
    "fuelType":{"S":"petrol"},
    "Position":{"M":{"lat":{"N":"3.995"}, "lon":{"N":"43.2221"}}},
    "id":{"N":"12345678"},
    "name":{"S":"Executive car 1"},
    "battery":{"N":"12.7"},
    "make":{"S":"Mazda"},
    "odometer":{"N":"43546"},
    "type":{"S":"SUV"}}
]
*/


    constructor(private carService: CarService) { }

    ngOnInit(): void {
      this.getAllCars();
    }




  /** GET */
  getAllCars():void{
    this.queryOngoing = true;
    this.carService.getAllCars()
    .subscribe(
                response => this.handleResponse(response),
                error => console.log(error)
    );
  }

  /** POST */
  //Please see app.components.ts


  /** PUT */
  updateCar(car:Car): void {
    this.carService.updateCar(car)
    .subscribe(
      error => console.log(error)
      );
  }

 

  /** DELETE */
  carToDelete(car:Car){
    this.carToDeleteObj = car;
  }

  deleteCar(): void {
    this.carService.deleteCar(parseInt(this.carToDeleteObj.id.N)).subscribe();
    this.cars = this.cars.filter(h => h !== this.carToDeleteObj);
  }


  handleResponse(res:any){
    this.queryOngoing = false;
    if(res.Items){
      this.cars = res.Items;
    }
  }


  /** Convert String to Float for lon & lat position */
  StringtoFloat(value:string){
    return parseFloat(value);
  }

  /** Is Array empty or full of cars */
  isCarsEmpty(){
    return this.cars.length === 0 ? true : false;
  }


  /** TODO : Updater for cars Array from main Composant */
  public carsAddObj(addCar:Car){
    this.cars.push(addCar);
  }


  /** Edit a car */
  edit(car: Car) {
    this.editCar = car;
  }

  update() {
    if (this.editCar) {
      this.carService
        .updateCar(this.editCar)
        .subscribe(car => {
        // replace the car in the car list with update from server
        const ix = car ? this.cars.findIndex(h => h.id.N === car.id.N) : -1;
        if (ix > -1) {
          this.cars[ix] = car;
        }
      });
      this.editCar = undefined;
    }
  }

}
