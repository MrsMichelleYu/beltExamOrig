import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  newPet: any;
  errors: any;
  noDuplicate: any;
  ngOnInit() {
    this.newPet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: '', likes: 0 };
  }
  onSubmit() {
    console.log(this.newPet);
    const observable = this.httpService.addPet(this.newPet);
    observable.subscribe(newPet => {
      if (newPet['err']) {
        console.log('We have an error', newPet);
        this.errors = newPet['err'];
      } else {
        console.log('We got our new Pet', newPet);
        this.goHome();
        this.newPet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: '', likes: 0 };
      }
    });
  }
  goHome() {
    this.router.navigate(['/pets']);
  }

}
