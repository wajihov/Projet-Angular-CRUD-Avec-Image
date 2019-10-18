import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  errorMail: string = "";
  // errorNom: string = "";
  // errorPrenom: string = "";
  constructor(private appService: AppServiceService) { }

  ngOnInit() {
    this.formRegister = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      // email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }


  onRegister() {

    console.log("l'utilisateur : ", this.formRegister);
    console.log("mail ", this.formRegister.controls.email.valid);

    let testEmail: Boolean = true;
    let listRegister = JSON.parse(localStorage.getItem("staff"));
    console.log("listRegister : ", listRegister);

    if (listRegister == null) listRegister = [];

    for (let i = 0; i < listRegister.length; i++) {
      if (listRegister[i].email == this.formRegister.value.email) {
        testEmail = false;
      }
    }
    if (testEmail == true) {
      if (this.formRegister.controls.email.valid == true) {
        this.appService.registerLocalStorage(this.formRegister.value);
      }
    }
    else {
      this.errorMail = "Mail Existant";
      console.log("Message d'erreur ", this.errorMail);
    }
    this.ngOnInit();
    // this.errorMail = "";
  }

  get userName() {
    return this.formRegister.get('nom');
  }

  get userPrenom() {
    return this.formRegister.get('prenom');
  }
  get userEmail() {
    return this.formRegister.get('email');
  }

}
