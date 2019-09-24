import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  onePet: any;
  updatePet: any;
  clicked: boolean = false;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getPetById(params['id']);
    });
  }
  getPetById(id) {
    const observable = this.httpService.getPetById(id);
    observable.subscribe(data => {
      console.log('We got one pet', data);
      this.onePet = data;
    });
  }
  deletePet(id) {
    const observable = this.httpService.deletePet(id);
    observable.subscribe(deletedAuthor => {
      console.log('We adopted one pet!', deletedAuthor);
      this.goHome();
    });
  }
  goHome() {
    this.router.navigate(['/pets']);
  }
  likePet(id) {
    const observable = this.httpService.likePet(id, this.updatePet);
    observable.subscribe(data => {
      console.log('Like one pet!', data);
      this.clicked = true;
      this.getPetById(id);
    });
    // const observable = this.httpService.getPetById(id);
    // observable.subscribe(data => {
    //   console.log('We got one pet', data);
    //   data['likes'] += 1;
    //   console.log('We increased a like', data);
    // });
  }

}
