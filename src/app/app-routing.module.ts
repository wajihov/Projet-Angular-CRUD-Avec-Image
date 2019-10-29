import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListRegisterComponent } from './list-register/list-register.component';
import { ModifContactComponent } from './modif-contact/modif-contact.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: "", canActivate: [AuthGuardGuard], component: RegisterComponent },
  { path: "register", canActivate: [AuthGuardGuard], component: RegisterComponent },
  { path: "modification/:id", canActivate: [AuthGuardGuard], component: ModifContactComponent },
  { path: "list-register", canActivate: [AuthGuardGuard], component: ListRegisterComponent },
  { path: "login", component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
