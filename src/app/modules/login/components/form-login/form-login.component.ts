import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IPerson} from '../../interface/person.interface';
import {LoginModel as Login} from '../../model/login.model';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public formLogin: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.createForm(new Login());
  }

  private createForm(login: Login): void {
    this.formLogin = this.formBuilder.group({
      email: [login.email, [Validators.required,  Validators.minLength(4)]],
      password: [login.password, [ Validators.required,   Validators.minLength(8)]]
    });
  }

  public onSubmit(data: IPerson): any {
    const payload: Login = new Login();

    payload.email = data.email;
    payload.password = data.password;

    this.loading = true;
    this.submitted = true;

    return this.authenticationService.login(payload).subscribe(
        () => this.router.navigateByUrl('/dashboard'),
        () => {},
        () => this.loading = false
      );
  }


}
