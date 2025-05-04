import { Component, OnInit } from '@angular/core';
import { BikeServiceService } from '../bike-service.service';
import { Bike } from '../bike';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[BikeServiceService]
})
export class HomeComponent implements OnInit {
  // bikes: Bike[] = [];
    bikes: any; 
  constructor(private bikeService: BikeServiceService) { }

  ngOnInit(): void {
    this.bikeService.getBikes().then(bikes => {
      this.bikes = bikes as Bike[];
    });
  }

}
