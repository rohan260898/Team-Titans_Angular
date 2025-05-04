import { Component, OnInit } from '@angular/core';
import { ScooterServiceService } from '../scooter-service.service';
import { Scooter } from '../scooter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scootercreate',
  templateUrl: './scootercreate.component.html',
  styleUrls: ['./scootercreate.component.css'],
  providers: [ScooterServiceService],
})
export class ScootercreateComponent implements OnInit {
  scooters: any;

  public newScooter: Scooter = {
    _id: '',
    make: '',
    model: '',
    year: 2023,
    color: '',
    price: '',
    image: '',
  };

  constructor(
    private scooterServiceService: ScooterServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  public createNewScooter(newScooter: Scooter): void {
    this.scooterServiceService.createScooter(newScooter);
    this.router.navigate(['/scooters']);
  }
}
