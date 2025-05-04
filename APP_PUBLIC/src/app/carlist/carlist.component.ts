import { Component, OnInit } from '@angular/core';
import { CarServiceService } from '../car-service.service';
import { Car } from '../car';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
  providers: [CarServiceService],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private carService: CarServiceService) {}

  ngOnInit(): void {
    this.carService.getCars().then((cars) => {
      this.cars = cars as Car[];
      this.filterCars();
    });
  }

  filterCars(): void {
    if (!this.searchText) {
      this.filteredCars = this.cars;
    } else {
      this.filteredCars = this.cars.filter(
        (car) =>
          car.make.toLowerCase().includes(this.searchText.toLowerCase()) ||
          car.model.toLowerCase().includes(this.searchText.toLowerCase()) ||
          car.year.toString().includes(this.searchText)
      );
    }
    this.totalPages = Math.ceil(this.filteredCars.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredCars = this.filteredCars.slice(startIndex, endIndex);
    this.calculatePageNumbers();
  }

  searchCars(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.filterCars();
  }

  private calculatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.filterCars();
  }
}
