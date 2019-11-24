import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/form-login/login.component';
import  {ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Interceptor } from './interceptor/interceptor';
import { TokenService } from './service/token.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    Interceptor
  ],
  providers: [
    AuthenticationService,
    TokenService
  ]
})
export class LoginModule { }
