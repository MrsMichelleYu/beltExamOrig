import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    this.getPets();
  }
  getPets() {
    return this.http.get('/pets1');
  }
  getPetById(id) {
    return this.http.get('/pets1/' + id);
  }
  addPet(newPet) {
    return this.http.post('/pets1/', newPet);
  }
  deletePet(id) {
    return this.http.delete('/pets/' + id);
  }
  editPet(id, editedPet: any) {
    return this.http.put('/pets1/' + id + '/edit', editedPet);
  }
  likePet(id, addedLike: any) {
    return this.http.put('/pets/' + id + '/like', addedLike);
  }
  // addBook(id, newBook) {
  //   return this.http.post('/books/' + id, newBook);
  // }
}
