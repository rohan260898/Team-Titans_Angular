import { Injectable } from '@angular/core';
import { Accessory } from './accessory'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
  private accessoriesUrl = 'http://localhost:3000/api/accessories';

  constructor(private http: HttpClient) { }

  getAccessories(): Promise<void | Accessory[]> {
    return this.http.get(this.accessoriesUrl)
               .toPromise()
               .then(response => response as Accessory[])
               .catch(this.handleError);
  }
  
  getSingleAccessory(accessoryId: string): Promise<void | Accessory> {
    return this.http.get(this.accessoriesUrl + '/' + accessoryId)
                .toPromise()
                .then(response => response as Accessory)
                .catch(this.handleError);
  }

  createAccessory(newAccessory: Accessory): Promise<void | Accessory> {
    return this.http.post(this.accessoriesUrl, newAccessory)
                .toPromise()
                .then(response => response as Accessory)
                .catch(this.handleError);
  }
  
  updateAccessory(accessoryId: string, accessory: Accessory): Observable<any> {
    return this.http.put(this.accessoriesUrl+'/'+accessoryId, accessory);
  }
  
  deleteAccessory(accessoryId: string): Observable<any> {
    return this.http.delete(this.accessoriesUrl + '/' + accessoryId);
  }

  
  private handleError (error: any){
    console.log("error");
  }

}
