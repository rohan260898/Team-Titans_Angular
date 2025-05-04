import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../car-service.service';
import { Car } from '../car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carcreate',
  templateUrl: './carcreate.component.html',
  styleUrls: ['./carcreate.component.css'],
  providers: [CarServiceService],
})
export class CarcreateComponent implements OnInit {
  cars: any;

  public newCar: Car = {
    _id: '',
    make: '',
    model: '',
    year: 2023,
    color: '',
    price: '',
    image: '',
  };

  constructor(
    private carServiceService: CarServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  public createNewCar(newCar: Car): void {
    this.carServiceService.createCar(newCar);
    this.router.navigate(['/cars']);
  }
}
