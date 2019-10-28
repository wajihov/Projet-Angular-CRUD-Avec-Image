import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-register',
  templateUrl: './list-register.component.html',
  styleUrls: ['./list-register.component.css']
})
export class ListRegisterComponent implements OnInit {

  list: any = [];
  img: any = [];
  
  constructor(private appService: AppServiceService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.appService.getListRegister();
    this.list = this.appService.listRegister;
    for (let i = 0; i < this.list.length; i++) {
      this.img[i] = this.list[i].image;
      this.transform(this.img[i]);
    }
    //console.log("Les utilisateurs ", this.list);
  }

  //Call this method in the image source, it will sanitize it.
  transform(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

  removeItem(i: number) {
    if (confirm("Are you sure to delete this person ? ")) {
      this.appService.getListRegister();
      this.appService.deleteLocalStorage(i);
      this.appService.setListRegister();
    }
    this.ngOnInit();
    this.router.navigate(['list-register']);
  }

}
