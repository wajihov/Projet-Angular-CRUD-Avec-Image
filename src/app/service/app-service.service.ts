import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  utilisateur: any = []

  constructor() { }

  registerLocalStorage(bloc: any) {
    let listRegister = JSON.parse(localStorage.getItem("staff"));
    if (listRegister == null) {
      listRegister = [];
    }
    listRegister.push(bloc);
    localStorage.setItem("staff", JSON.stringify(listRegister));
  }
}
