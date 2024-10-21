import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './pages/nav/nav.component';



@NgModule({
  declarations: [
    ConfirmComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
