import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  pets: any;
  ngOnInit() {
    this.getAllPets();
    this.goHome();
  }
  getAllPets() {
    const observable = this.httpService.getPets();
    observable.subscribe(data => {
      console.log('Got all our pets!', data);
      this.pets = data;
    });
  }
  goHome() {
    this.router.navigate(['/pets']);
  }
}
