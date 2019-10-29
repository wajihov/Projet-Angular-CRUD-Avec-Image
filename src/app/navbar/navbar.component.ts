import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private appServive: AppServiceService, private router: Router) { }

  ngOnInit() {
  }

  disconnect() {
    this.appServive.loggedOut();
    this.router.navigate(['login']);
  }

}
