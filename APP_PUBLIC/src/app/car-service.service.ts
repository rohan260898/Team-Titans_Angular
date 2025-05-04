import { Injectable } from '@angular/core';
import { Car } from './car'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  private carsUrl = 'http://localhost:3000/api/cars';

  constructor(private http: HttpClient) { }

  getCars(): Promise<void | Car[]> {
    return this.http.get(this.carsUrl)
               .toPromise()
               .then(response => response as Car[])
               .catch(this.handleError);
  }
  
  //service to getSingleCar
  getSingleCar(carId: string): Promise<void | Car> {
    return this.http.get(this.carsUrl + '/' + carId)
                .toPromise()
                .then(response => response as Car)
                .catch(this.handleError);
  }

  //service to createCar
  createCar(newCar: Car): Promise<void | Car> {
    return this.http.post(this.carsUrl, newCar)
                .toPromise()
                .then(response => response as Car)
                .catch(this.handleError);
  }
  
  //service to updateCar
  updateCar(carId: string, car: Car): Observable<any> {
    return this.http.put(this.carsUrl+'/'+carId, car);
  }
  
  //service to deleteCar
  deleteCar(carId: string): Observable<any> {
    return this.http.delete(this.carsUrl + '/' + carId);
  }

  
  private handleError (error: any){
    console.log("error");
  }

}
