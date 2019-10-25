import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListRegisterComponent } from './list-register/list-register.component';
import { ModifContactComponent } from './modif-contact/modif-contact.component';


const routes: Routes = [
  { path: "", component: RegisterComponent },
  { path: "register", component: RegisterComponent },
  { path: "wajih", component: ModifContactComponent },
  { path: "modification/:id", component: ModifContactComponent },
  { path: "list-register", component: ListRegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
