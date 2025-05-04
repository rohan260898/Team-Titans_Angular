import { Component, OnInit } from '@angular/core';
import { BikeServiceService } from '../bike-service.service';
import { Bike } from '../bike';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [BikeServiceService],
})
export class ListComponent implements OnInit {
  bikes: Bike[] = [];
  filteredBikes: Bike[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private bikeService: BikeServiceService) {}

  ngOnInit(): void {
    this.bikeService.getBikes().then((bikes) => {
      this.bikes = bikes as Bike[];
      this.filterBikes();
    });
  }

  filterBikes(): void {
    if (!this.searchText) {
      this.filteredBikes = this.bikes;
    } else {
      this.filteredBikes = this.bikes.filter(
        (bike) =>
          bike.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          bike.model.toLowerCase().includes(this.searchText.toLowerCase()) ||
          bike.brand.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    this.totalPages = Math.ceil(this.filteredBikes.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredBikes = this.filteredBikes.slice(startIndex, endIndex);
    this.calculatePageNumbers();
  }

  searchBikes(): void {
    this.currentPage = 1;
    this.filterBikes();
  }

  private calculatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.filterBikes();
  }
}
