import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarServiceService } from '../car-service.service';
import { Car } from '../car';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css'],
  providers: [CarServiceService]
})
export class CardetailsComponent implements OnInit {
  pageContent = {
    header: {
      _id: '',
      make: '',
      model: '',
      year: 0,
      color: '',
      price: '',
      image: ''
    }
  };

  newCar: Car | undefined;
  carId: any;

  constructor(
    private carServiceService: CarServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.carId = params['carId'];
          return this.carServiceService.getSingleCar(params['carId']);
        })
      )
      .subscribe((newCar: any) => {
        this.newCar = newCar;
        this.pageContent.header.make = this.newCar?.make as string;
        this.pageContent.header.model = this.newCar?.model as string;
        this.pageContent.header.year = this.newCar?.year as number;
        this.pageContent.header.color = this.newCar?.color as string;
        this.pageContent.header.price = this.newCar?.price as string;
        this.pageContent.header.image = this.newCar?.image as string;
      });
  }

  editData(data: any) {
    localStorage.setItem('cars', JSON.stringify(this.newCar));
    this.router.navigateByUrl('/carupdate');
  }

  deleteData(data: any) {
    this.carServiceService.deleteCar(this.carId).subscribe((res) => {
      this.router.navigate(['/cars']);
    });
  }
}
