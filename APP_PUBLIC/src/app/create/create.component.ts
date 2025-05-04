import { Component, OnInit } from '@angular/core';

import { Bike } from '../bike';
import { BikeServiceService } from '../bike-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [BikeServiceService]
})
export class CreateComponent implements OnInit {
  bikes:any;

  public newBike: Bike = {
    
    _id: '',
    name: '',
    description: '',
    model: '',
    seats: 0,
    launchYear: 2023,
    image: '',
    color: '',
    price: '',
    brand: '',
    rating: 0,
  }
  constructor(private bikeServiceService: BikeServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  public createNewBike(newBike: Bike): void {
    this.bikeServiceService.createBike(newBike);
    this.router.navigate(['/list']);
}

}
