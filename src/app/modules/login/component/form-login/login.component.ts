import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ILogin} from '../../interface/login.interface';
import {Login} from '../../model/login.model';
import {AuthenticationService} from '../../service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.createForm(new Login());

  }

  private createForm(login: ILogin): void {
    this.formLogin = this.formBuilder.group({
      email: [login.email],
      password: [login.password]
    });
  }

  public onSubmit(): any {
    const login: ILogin = new Login();

    login.email = this.formLogin.get('email').value;
    login.password = this.formLogin.get('password').value;

    this.loading = true;
    return this.authenticationService.login(login).subscribe( () => {
      this.loading = false;
    });
  }


}
