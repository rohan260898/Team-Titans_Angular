import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bike } from '../bike';
import { BikeServiceService } from '../bike-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [BikeServiceService]
})
export class UpdateComponent implements OnInit {
  bikes:any;

  public newBike: Bike = {
    
    _id: '',
    name: '',
    description: '',
    model: '',
    seats: 0,
    launchYear: 0,
    image: '',
    color: '',
    price: '',
    brand: '',
    rating: 0,
  }
  constructor(private bikeServiceService: BikeServiceService, private router: Router) { }

  ngOnInit(): void {
    debugger
    this.bikes= JSON.parse(localStorage.getItem('bikes')|| '{}');
    localStorage.removeItem('bikes');
    if(this.bikes._id){
     this.editData(this.bikes);
     
    }
  }

  editData(bikes:any){
    this.newBike= bikes;
   }
   //method for editBook
  public editBike(newBike: Bike): void {
      this.bikeServiceService.updateBike(this.bikes._id,newBike).subscribe(res => {
        debugger
        console.log(res);
        this.router.navigate(['/list']);
      })
    }
}
