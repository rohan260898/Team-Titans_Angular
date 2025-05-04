import { Injectable } from '@angular/core';
import { Bike } from './bike'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeServiceService {
  public bikesData:any;
  private bikesUrl = 'http://localhost:3000/api/bikes';

  constructor(private http: HttpClient) { }

  getBikes(): Promise<void | Bike[]> {
    return this.http.get(this.bikesUrl)
               .toPromise()
               .then(response => response as Bike[])
               .catch(this.handleError);
  }
  
  //service to getSingleBike
  getSingleBike(bikeId: String): Promise<void | Bike> {
    return this.http.get(this.bikesUrl + '/' + bikeId)
                .toPromise()
                .then(response => response as Bike)
                .catch(this.handleError);
  }

  //service to createBike
  createBike(newBike: Bike): Promise<void | Bike> {
    return this.http.post(this.bikesUrl, newBike)
                .toPromise()
                .then(response => response as Bike)
                .catch(this.handleError);
  }
  
  //service to updateBike
  updateBike = (bikeId:any,bike: any): Observable<any> => {
    return this.http.put(this.bikesUrl+'/'+bikeId, bike);
  }
  
  //service to deleteBike
  deleteBike(bikeId: any): Observable<any> {
    return this.http.delete(this.bikesUrl + '/' + bikeId);
  }

  
  private handleError (error: any){
    console.log("error");
  }

}
