import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Car } from './car/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = "/cars";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  

  /** GET all cars from the server */
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl+"/getall", this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('getAllCars', []))
    );
  }


  /** POST: add a new car to the server */
  addCar(car: Car): Observable<any> {
    return this.http.post<Car>(this.carsUrl+"/add", car.toString(), this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('addCar',car))
    );
  }


  /** PUT: update the car on the server */
  updateCar(car: Car): Observable<any> {
    return this.http.put(this.carsUrl+"/update", car, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateCar'))
    );
  }


  /** DELETE: delete the car from the server */
  deleteCar(carId: number): Observable<any> {
    return this.http.delete<any>(this.carsUrl+"/delete?id="+carId.toString(), this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('deleteCar'))
    );
  }


  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
