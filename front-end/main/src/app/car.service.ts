import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

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
    return this.http.get<Car[]>(this.carsUrl+"/getall")
    .pipe(
      catchError(this.handleError<Car[]>('getAllCars', []))
    );
  }


  /** POST: add a new car to the server */
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions)
    .pipe(
      catchError(this.handleError<Car>('addCar'))
    );
  }


  /** PUT: update the car on the server */
  updateCar(car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateCar'))
    );
  }


  /** DELETE: delete the car from the server */
  deleteCar(car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `${this.carsUrl}/${id}`;

    return this.http.delete<Car>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError<Car>('deleteCar'))
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
