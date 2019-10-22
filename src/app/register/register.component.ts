import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  errorMail: string = "";
  errorImage: string = "";
  readerResult = new FileReader();



  constructor(private appService: AppServiceService, private http: HttpClient) { }

  ngOnInit() {
    this.formRegister = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      // email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      image: new FormControl('', [Validators.required])
    });
  }

  onFileSelect(event) {
    console.log("event : ", event);
    let file = event.target.files[0];
    console.log('SIZE :', event.target.files[0].size);
    if (event.target.files[0].size > 51200) {
      this.errorImage = "Image loard";
      console.log(this.errorImage);
    }
    else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.readerResult = reader;
      reader.onload = function () {
        console.log("Upload image : ", reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  onRegister() {

    console.log("l'utilisateur : ", this.formRegister);


    let testEmail: Boolean = true;
    let listRegister = JSON.parse(localStorage.getItem("staff"));
    console.log("listRegister : ", listRegister);
    this.formRegister['image'] = this.readerResult.result;
    console.log('NNNNNNNNNNNNN', this.readerResult.result);
    console.log("BBBBBB : ", this.formRegister['image']);
    if (listRegister == null) listRegister = [];

    for (let i = 0; i < listRegister.length; i++) {
      if (listRegister[i].email == this.formRegister.value.email) {
        testEmail = false;
      }
    }

    if (testEmail == true) {
      if (this.formRegister.controls.email.valid == true) {
        this.formRegister.controls['image'].setValue({ 'image': this.readerResult.result })
        this.appService.registerLocalStorage(this.formRegister.value);
        console.log('Aplication BHBHBHBHBHBHBHH : ', this.formRegister.value);
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
