import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  utilisateur: any = [];
  listRegister: any = [];

  constructor(private http: HttpClient) { }

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

  loggedIn() {
    //return !!localStorage.getItem("token");
    return !!localStorage.getItem("authentification");
  }

  addAuthentification(mail: string, pass: string) {
    this.getListRegister();
    let auth: any;
    for (let i = 0; i < this.listRegister.length; i++) {
      if (this.listRegister[i].email == mail && this.listRegister[i].password == pass) {
        auth = this.listRegister[i];
        break;
      }
    }
    if (auth == null) {
      alert("Login ou/et password incorrect");
    }
    else {
      localStorage.setItem("authentification", JSON.stringify(auth));
    }
  }

}