import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccessoryService } from '../accessory-service.service';
import { Accessory } from '../accessory';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-accessorydetails',
  templateUrl: './accessorydetails.component.html',
  styleUrls: ['./accessorydetails.component.css'],
  providers: [AccessoryService],
})
export class AccessorydetailsComponent implements OnInit {
  pageContent = {
    header: {
      _id: '',
      name: '',
      type: '',
      price: '',
      image: '',
    },
  };

  newAccessory: Accessory | undefined;
  accessoryId: any;

  constructor(
    private accessoryService: AccessoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.accessoryId = params['accessoryId'];
          return this.accessoryService.getSingleAccessory(
            params['accessoryId']
          );
        })
      )
      .subscribe((newAccessory: any) => {
        this.newAccessory = newAccessory;
        this.pageContent.header.name = this.newAccessory?.name as string;
        this.pageContent.header.type = this.newAccessory?.type as string;
        this.pageContent.header.price = this.newAccessory?.price as string;
        this.pageContent.header.image = this.newAccessory?.image as string;
      });
  }

  editData(data: any) {
    localStorage.setItem('accessories', JSON.stringify(this.newAccessory));
    this.router.navigateByUrl('/accessoryupdate');
  }

  deleteData(data: any) {
    this.accessoryService.deleteAccessory(this.accessoryId).subscribe((res) => {
      this.router.navigate(['/accessory']);
    });
  }
}
