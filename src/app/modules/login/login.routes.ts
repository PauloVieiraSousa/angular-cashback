import {FormLoginComponent} from './components/form-login/form-login.component';
import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormRegisterComponent} from './components/form-register/form-register.component';
import {LoginComponent} from './login.component';

const loginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
      },
      {
        path: 'access',
        component: FormLoginComponent
      },
      {
        path: 'register',
        component: FormRegisterComponent
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutesModule {

}



