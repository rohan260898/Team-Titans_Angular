import { Component, OnInit } from '@angular/core';
import { AccessoryService } from '../accessory-service.service';
import { Accessory } from '../accessory';

@Component({
  selector: 'app-accessorylist',
  templateUrl: './accessorylist.component.html',
  styleUrls: ['./accessorylist.component.css'],
  providers: [AccessoryService],
})
export class AccessoryListComponent implements OnInit {
  accessories: Accessory[] = [];
  filteredAccessories: Accessory[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private accessoryService: AccessoryService) {}

  ngOnInit(): void {
    this.accessoryService.getAccessories().then((accessories) => {
      this.accessories = accessories as Accessory[];
      this.filterAccessories();
    });
  }

  filterAccessories(): void {
    if (!this.searchText) {
      this.filteredAccessories = this.accessories;
    } else {
      this.filteredAccessories = this.accessories.filter((accessory) =>
        accessory.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    this.totalPages = Math.ceil(
      this.filteredAccessories.length / this.itemsPerPage
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredAccessories = this.filteredAccessories.slice(
      startIndex,
      endIndex
    );
    this.calculatePageNumbers();
  }

  searchAccessories(): void {
    this.currentPage = 1;
    this.filterAccessories();
  }

  private calculatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.filterAccessories();
  }
}
