import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegisterModel as Register} from '../../model/register.model';
import {IPerson} from '../../interface/person.interface';
import { Location } from '@angular/common';
import {AuthenticationService} from '../../service/authentication.service';
import {Observable, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  public formRegister: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private authenticationService: AuthenticationService,
              private toast: ToastrService,
              private router: Router) { }

  ngOnInit() {

    this.createForm();

  }


  private createForm(): void {
    const register = new Register();
    this.formRegister = this.formBuilder.group(
      {
        fullname: [register.fullname],
        email: [register.email],
        cpf: [register.cpf],
        password: [register.password]
      }
    );
  }


  public onSubmit(data: IPerson): Subscription {
    this.loading = true;
    return this.authenticationService.register(data).subscribe(
      () => {
        this.toast.success('Registered person', 'Register');
        this.resetForm();
        this.router.navigateByUrl('/login/access');
      },
      () => this.toast.error('Error in registered person', 'Register'),
      () => this.loading = false);
  }


  public resetForm(): void {
    this.formRegister.reset();
  }


}
