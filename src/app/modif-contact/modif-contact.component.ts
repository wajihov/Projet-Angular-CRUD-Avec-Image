import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  displayImg: boolean;

  public imagePath;
  imgURL: any;
  public message: string;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;


  constructor(private route: ActivatedRoute, private appService: AppServiceService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.appService.getListRegister();
    this.img = this.appService.listRegister[id].image;
    this.transform(this.img);
    this.displayImg = true;
    this.formUser = new FormGroup({
      nom: new FormControl(this.appService.listRegister[id].nom, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      prenom: new FormControl(this.appService.listRegister[id].prenom, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      email: new FormControl(this.appService.listRegister[id].email, [Validators.required, Validators.email]),
      password: new FormControl(this.appService.listRegister[id].password, [Validators.required, Validators.minLength(8)]),
      image: new FormControl(this.appService.listRegister[id].image)
    });
    this.index = id;
    this.readerResult2 = this.appService.listRegister[id].image;
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
      this.displayImg = false;
    }
  }

  onFileSelect(event) {
    console.log("event : ", event);
    let file = event.target.files[0];
    this.fileData = <File>event.target.files[0];
    this.preview();
    console.log('SIZE :', event.target.files[0].size);
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

  onReset() {
    console.log("Dans reset");
    this.router.navigate(['list-register']);
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