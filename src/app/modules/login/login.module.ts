import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';
import { TokenService } from './service/token.service';
import {LoginRoutesModule} from './login.routes';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import {LoginComponent} from './login.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [FormLoginComponent, FormRegisterComponent, LoginComponent],
  exports: [ FormLoginComponent, LoginComponent, FormRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    Interceptor,
    NgxMaskModule.forRoot(),
    LoginRoutesModule
  ],
  providers: [
    AuthenticationService,
    TokenService
  ]
})
export class LoginModule {}
