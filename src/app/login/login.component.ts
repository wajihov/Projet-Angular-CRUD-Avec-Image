import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appservice: AppServiceService, private router: Router) { }

  formAuth: FormGroup;
  ngOnInit() {
    this.formAuth = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  connecter() {
    this.appservice.addAuthentification(this.formAuth.value.email, this.formAuth.value.password);
    this.router.navigate(['list-register']);
  }

}
