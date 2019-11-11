import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/form-login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class LoginModule { }
