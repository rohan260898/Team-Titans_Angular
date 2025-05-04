import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Scooter } from '../scooter';
import { ScooterServiceService } from '../scooter-service.service';

@Component({
  selector: 'app-scooterupdate',
  templateUrl: './scooterupdate.component.html',
  styleUrls: ['./scooterupdate.component.css'],
  providers: [ScooterServiceService]
})
export class ScooterupdateComponent implements OnInit {
  scooters: any;

  public newScooter: Scooter = {
    _id: '',
    make: '',
    model: '',
    year: 0,
    color: '',
    price: '',
    image: ''
  };

  constructor(private scooterServiceService: ScooterServiceService, private router: Router) { }

  ngOnInit(): void {
    debugger
    this.scooters = JSON.parse(localStorage.getItem('scooters') || '{}');
    localStorage.removeItem('scooters');
    if (this.scooters._id) {
      this.editData(this.scooters);
    }
  }

  editData(scooters: any) {
    this.newScooter = scooters;
  }

  public editScooter(newScooter: Scooter): void {
    this.scooterServiceService.updateScooter(this.scooters._id, newScooter).subscribe(res => {
      console.log(res);
      this.router.navigate(['/scooters']);
    });
  }
}
