import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { BikeServiceService } from '../bike-service.service';
import { Bike } from '../bike';
import { switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers:[BikeServiceService]
})
export class DetailsComponent implements OnInit {
  pageContent = {
    header: {
      _id: '',
      name: '',
      description: '',
      model: '',
      seats: 0,
      launchYear: 0,
      image: '',
      color: '',
      price: '',
      brand: '',
      rating: 0,
    }
  }
  constructor(private bikeServiceService: BikeServiceService, 
    private route: ActivatedRoute, private _router: Router) { }

    newBike: Bike | undefined;
    bikeId: any;
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) =>{
        this.bikeId=params['bikeId'];
        return this.bikeServiceService.getSingleBike(params['bikeId'])
      }
    ))
    .subscribe((newBike: any) => {
      debugger
      this.newBike = newBike;
      this.pageContent.header.name = (this.newBike?.name) as string;
      this.pageContent.header.description = (this.newBike?.description) as string;
      this.pageContent.header.model = (this.newBike?.model) as string;
      this.pageContent.header.seats = (this.newBike?.seats) as number;
      this.pageContent.header.launchYear = (this.newBike?.launchYear) as number;
      this.pageContent.header.image = (this.newBike?.image) as string;
      this.pageContent.header.color = (this.newBike?.color) as string;
      this.pageContent.header.price = (this.newBike?.price) as string;
      this.pageContent.header.brand = (this.newBike?.brand) as string;
      this.pageContent.header.rating = (this.newBike?.rating) as number;
    });
  }

  editData(data:any){
    localStorage.setItem('bikes', JSON.stringify(this.newBike));
     this._router.navigateByUrl('/edit');
   }
   //method for delete
   deleteData(data:any){
     this.bikeServiceService.deleteBike(this.bikeId).subscribe(res => {
       this._router.navigate(['/list']);
     })
   }
}
