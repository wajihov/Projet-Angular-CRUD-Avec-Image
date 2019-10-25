import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { Router } from '@angular/router';

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
  pathImage: any = 'assets/image/P_inconnue.jpg';
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  displayImage: boolean;


  @ViewChild('myInput', { static: false }) myInputVariable: ElementRef;

  constructor(private appService: AppServiceService, private router: Router) { }

  ngOnInit() {
    this.readerResult = null;
    this.formRegister = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      // email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      image: new FormControl('', [Validators.required])
    });
    this.displayImage = false;
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.displayImage = true;
    }
  }

  onFileSelect(event) {
    //console.log("event : ", event);
    let file = event.target.files[0];
    //console.log('SIZE :', event.target.files[0].size);
    this.fileData = <File>event.target.files[0];
    this.preview();
    if (event.target.files[0].size > 200200) {
      this.errorImage = "Image loard";
      console.log(this.errorImage);
    }
    else {
      this.errorImage = "";
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
    //console.log("l'utilisateur : ", this.formRegister);
    let testEmail: Boolean = true;
    this.appService.getListRegister();
    //console.log("listRegister : ", this.appService.listRegister);
    for (let i = 0; i < this.appService.listRegister.length; i++) {
      if (this.appService.listRegister[i].email == this.formRegister.value.email) {
        testEmail = false;
      }
    }
    // console.log("password : ", this.formRegister.controls.password);
    if (testEmail == true) {
      if (this.formRegister.controls.email.valid == true && this.formRegister.controls.password.value != "") {
        if (this.readerResult != null)
          this.formRegister.controls['image'].setValue(this.readerResult.result);
        else {
          this.formRegister.controls['image'].setValue(this.pathImage);
        }
        this.appService.registerLocalStorage(this.formRegister.value);
        this.router.navigate(['list-register']);
      }
    }
    else {
      this.errorMail = "Mail Existant";
      console.log("Message d'erreur ", this.errorMail);
    }
    this.ngOnInit();
    this.myInputVariable.nativeElement.value = "";
  }

  onReset() {
    this.router.navigate(['list-register']);
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