import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modif-contact',
  templateUrl: './modif-contact.component.html',
  styleUrls: ['./modif-contact.component.css']
})
export class ModifContactComponent implements OnInit {

  formUser: FormGroup;
  index: number;
  errorMail: string = "";
  img: any = [];
  errorImage: string = "";
  readerResult = new FileReader();
  readerResult2 = new FileReader();

  constructor(private route: ActivatedRoute, private appService: AppServiceService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.appService.getListRegister();
    console.log("Dans Modif contact ", this.appService.listRegister[id]);
    this.img = this.appService.listRegister[id].image;
    this.transform(this.img);
    this.formUser = new FormGroup({
      nom: new FormControl(this.appService.listRegister[id].nom),
      prenom: new FormControl(this.appService.listRegister[id].prenom),
      email: new FormControl(this.appService.listRegister[id].email),
      password: new FormControl(this.appService.listRegister[id].password),
      image: new FormControl(this.appService.listRegister[id].image)
    });
    this.index = id;
    this.readerResult2 = this.appService.listRegister[id].image;
  }

  onFileSelect(event) {
    console.log("event : ", event);
    let file = event.target.files[0];
    console.log('SIZE :', event.target.files[0].size);
    if (event.target.files[0].size > 1200200) {
      this.errorImage = "Image loard";
      console.log(this.errorImage);
    }
    else {
      this.errorImage = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.readerResult = reader;
      reader.onload = function () {
        console.log("Upload image : ");
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  onUpdate() {
    this.appService.getListRegister();
    if (this.formUser.controls.email.valid == true && this.formUser.controls.password.value != "") {
      if (this.readerResult != null) {
        this.formUser.get('image').setValue(this.readerResult.result);
      }
      if (this.readerResult.result == null) {
        this.formUser.get('image').setValue(this.readerResult2);
      }
      this.appService.updateLocalStorage(this.formUser.value, this.index);
      this.router.navigate(['list-register']);
    }
  }

  transform(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

  get userName() {
    return this.formUser.get('nom');
  }

  get userPrenom() {
    return this.formUser.get('prenom');
  }
  get userEmail() {
    return this.formUser.get('email');
  }

}