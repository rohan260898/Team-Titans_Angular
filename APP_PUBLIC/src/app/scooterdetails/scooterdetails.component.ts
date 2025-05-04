import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ScooterServiceService } from '../scooter-service.service';
import { Scooter } from '../scooter';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-scooterdetails',
  templateUrl: './scooterdetails.component.html',
  styleUrls: ['./scooterdetails.component.css'],
  providers: [ScooterServiceService]
})
export class ScooterdetailsComponent implements OnInit {
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

  newScooter: Scooter | undefined;
  scooterId: any;

  constructor(
    private scooterServiceService: ScooterServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.scooterId = params['scooterId'];
          return this.scooterServiceService.getSingleScooter(params['scooterId']);
        })
      )
      .subscribe((newScooter: any) => {
        this.newScooter = newScooter;
        this.pageContent.header.make = this.newScooter?.make as string;
        this.pageContent.header.model = this.newScooter?.model as string;
        this.pageContent.header.year = this.newScooter?.year as number;
        this.pageContent.header.color = this.newScooter?.color as string;
        this.pageContent.header.price = this.newScooter?.price as string;
        this.pageContent.header.image = this.newScooter?.image as string;
      });
  }

  editData(data: any) {
    localStorage.setItem('scooters', JSON.stringify(this.newScooter));
    this.router.navigateByUrl('/scooterupdate');
  }

  deleteData(data: any) {
    this.scooterServiceService.deleteScooter(this.scooterId).subscribe((res) => {
      this.router.navigate(['/scooters']);
    });
  }
}
