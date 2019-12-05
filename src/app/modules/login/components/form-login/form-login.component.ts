import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IPerson} from '../../interface/person.interface';
import {LoginModel as Login} from '../../model/login.model';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  public formLogin: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) { }

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
        () => {
          this.toastr.success('User successfully logged in', 'Login');
          this.router.navigateByUrl('/dashboard');
        },
        () => this.toastr.error('User not authorized', 'Login'),
        () => this.loading = false
      );
  }


}
