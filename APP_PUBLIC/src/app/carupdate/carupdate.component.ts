import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarServiceService } from '../car-service.service';

@Component({
  selector: 'app-carupdate',
  templateUrl: './carupdate.component.html',
  styleUrls: ['./carupdate.component.css'],
  providers: [CarServiceService]
})
export class CarupdateComponent implements OnInit {
  cars: any;

  public newCar: Car = {
    _id: '',
    make: '',
    model: '',
    year: 0,
    color: '',
    price: '',
    image: ''
  };

  constructor(private carServiceService: CarServiceService, private router: Router) { }

  ngOnInit(): void {
    debugger
    this.cars = JSON.parse(localStorage.getItem('cars') || '{}');
    localStorage.removeItem('cars');
    if (this.cars._id) {
      this.editData(this.cars);
    }
  }

  editData(cars: any) {
    this.newCar = cars;
  }

  public editCar(newCar: Car): void {
    this.carServiceService.updateCar(this.cars._id, newCar).subscribe(res => {
      console.log(res);
      this.router.navigate(['/cars']);
    });
  }
}
