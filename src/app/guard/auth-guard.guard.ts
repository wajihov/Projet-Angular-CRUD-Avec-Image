import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppServiceService } from '../service/app-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService: AuthGuardGuard,
    private router: Router,
    private appService: AppServiceService) { }
  canActivate(): boolean {
    if (this.appService.loggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
