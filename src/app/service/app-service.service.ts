import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  utilisateur: any = [];
  listRegister: any = [];

  constructor() { }

  getListRegister() {
    this.listRegister = JSON.parse(localStorage.getItem("staff"));
    if (this.listRegister == null) {
      this.listRegister = [];
    }
  }
  
  setListRegister() {
    localStorage.setItem("staff", JSON.stringify(this.listRegister));
  }

  registerLocalStorage(bloc: any) {
    this.getListRegister();
    this.listRegister.push(bloc);
    this.setListRegister();
  }

  updateLocalStorage(bloc: any, index: number) {
    this.getListRegister();
    this.listRegister[index] = bloc;
    this.setListRegister();
  }

  deleteLocalStorage(index: number) {
    this.listRegister.splice(index, 1);
  }

}