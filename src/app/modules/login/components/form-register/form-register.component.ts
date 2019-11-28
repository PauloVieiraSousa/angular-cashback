import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegisterModel as Register} from '../../model/register.model';
import {IPerson} from '../../interface/person.interface';
import { Location } from '@angular/common';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  public formRegister: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location, private authenticationService: AuthenticationService) { }

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


  public onSubmit(data: IPerson): void {
    this.authenticationService.register(data).subscribe(
      () => this.resetForm(),
      () => {},
      () => {});
  }


  public resetForm(): void {
    this.formRegister.reset();
  }


}
