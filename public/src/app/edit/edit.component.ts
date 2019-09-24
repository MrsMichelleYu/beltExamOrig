import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  updatePet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: '', oldName: '' };
  errors: any;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getPetById(params['id']);
    });
  }
  editPet(id) {
    console.log(this.updatePet);
    const observable = this.httpService.editPet(id, this.updatePet);
    observable.subscribe((data: any) => {
      console.log(data);
      if (data['err']) {
        console.log('We have an error', this.updatePet);
        this.errors = data['err'];
      } else {
        console.log('Edit one pet!', data);
        this.goToShow(id);
      }
    });
  }
  getPetById(id) {
    const observable = this.httpService.getPetById(id);
    observable.subscribe((data: any) => {
      console.log('We got one pet', data);
      this.updatePet = data;
      this.updatePet.oldName = data.name;
    });
  }
  goToShow(id) {
    this.router.navigate([`/pets/${id}`]);
  }
}
