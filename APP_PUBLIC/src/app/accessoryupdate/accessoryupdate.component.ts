import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accessory } from '../accessory';
import { AccessoryService } from '../accessory-service.service';

@Component({
  selector: 'app-accessoryupdate',
  templateUrl: './accessoryupdate.component.html',
  styleUrls: ['./accessoryupdate.component.css'],
  providers: [AccessoryService],
})
export class AccessoryupdateComponent implements OnInit {
  accessories: any;

  public newAccessory: Accessory = {
    _id: '',
    name: '',
    type: '',
    price: '',
    image: '',
  };

  constructor(
    private accessoryService: AccessoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accessories = JSON.parse(localStorage.getItem('accessories') || '{}');
    localStorage.removeItem('accessories');
    if (this.accessories._id) {
      this.editData(this.accessories);
    }
  }

  editData(accessories: any) {
    this.newAccessory = accessories;
  }

  public editAccessory(newAccessory: Accessory): void {
    this.accessoryService
      .updateAccessory(this.accessories._id, newAccessory)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/accessory']);
      });
  }
}
