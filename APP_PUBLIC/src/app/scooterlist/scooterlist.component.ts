import { Component, OnInit } from '@angular/core';
import { ScooterServiceService } from '../scooter-service.service';
import { Scooter } from '../scooter';

@Component({
  selector: 'app-scooterlist',
  templateUrl: './scooterlist.component.html',
  styleUrls: ['./scooterlist.component.css'],
  providers: [ScooterServiceService],
})
export class ScooterListComponent implements OnInit {
  scooters: Scooter[] = [];
  filteredScooters: Scooter[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private scooterService: ScooterServiceService) { }

  ngOnInit(): void {
    this.scooterService.getScooters().then((scooters) => {
      this.scooters = scooters as Scooter[];
      this.filterScooters();
    });
  }

  filterScooters(): void {
    if (!this.searchText) {
      this.filteredScooters = this.scooters;
    } else {
      this.filteredScooters = this.scooters.filter(
        (scooter) =>
          scooter.make.toLowerCase().includes(this.searchText.toLowerCase()) ||
          scooter.model.toLowerCase().includes(this.searchText.toLowerCase()) ||
          scooter.year.toString().includes(this.searchText)
      );
    }
    this.totalPages = Math.ceil(this.filteredScooters.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredScooters = this.filteredScooters.slice(startIndex, endIndex);
    this.calculatePageNumbers();
  }

  searchScooters(): void {
    this.filterScooters();
  }

  private calculatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.filterScooters();
  }
}
