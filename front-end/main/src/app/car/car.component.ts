import { Component, OnInit } from '@angular/core';

import { CarService } from '../car.service';
import { Car } from './car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {

  //cars: Car[];

  /* FOR DEV ONLY */
  /** cars: Car[] */
  cars = 
  [{
    "model":{"S":"clioII"},
    "vin":{"S":"DF662BN"},
    "year":{"S":"2008"},
    "fuel":{"N":"35"},
    "fuelType":{"S":"diesel"},
    "Position":{"M":{"lat":{"N":47.46423},"lon":{"N":8.311234}}},
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


    constructor(private carService: CarService) { }

    ngOnInit(): void {
      this.getAllCars();
    }




  /** GET */
  getAllCars():void{
    this.carService.getAllCars()
    .subscribe(
                response => this.handleResponse(response),
                error => console.log(error)
    );
  }

  /** POST */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.carService.addCar({ name } as Car)
      .subscribe(car => {
//        this.cars.push(car);
      });
  }

  /** PUT */
  save(car:Car): void {
    this.carService.updateCar(car);
    //TODO : update the liste!!
  }

 

  /** DELETE */
  delete(car: Car): void {
  //  this.cars = this.cars.filter(h => h !== car);
    this.carService.deleteCar(car).subscribe();
  }

  handleResponse(res){
    this.cars = res.Items;
  }

}
