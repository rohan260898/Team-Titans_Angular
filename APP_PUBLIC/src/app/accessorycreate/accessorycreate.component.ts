import { Component, OnInit } from '@angular/core';
import { Accessory } from '../accessory';
import { AccessoryService } from '../accessory-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessorycreate',
  templateUrl: './accessorycreate.component.html',
  styleUrls: ['./accessorycreate.component.css'],
  providers: [AccessoryService],
})
export class AccessorycreateComponent implements OnInit {
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

  ngOnInit(): void {}

  public createNewAccessory(newAccessory: Accessory): void {
    this.accessoryService.createAccessory(newAccessory);
    this.router.navigate(['/accessory']);
  }
}
