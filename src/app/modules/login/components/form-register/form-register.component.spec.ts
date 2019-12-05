import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterComponent } from './form-register.component';
import {IPerson} from '../../interface/person.interface';
import { PersonMock } from '../../../../../../mocks';

import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {of} from 'rxjs';

import {delay} from 'rxjs/operators';


const formBuilder: FormBuilder = new FormBuilder();
const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const LocationSpy = jasmine.createSpyObj('Location', ['go']);

describe('FormRegisterComponent', () => {
  let component: FormRegisterComponent;
  let fixture: ComponentFixture<FormRegisterComponent>;
  let AuthenticateSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegisterComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy },
        {provide: Router, useValue: routerSpy},
        {provide: FormBuilder, useValue: formBuilder},
        {provide: Location, useValue: LocationSpy}
      ]
    })
    .compileComponents();


    AuthenticateSpy = authenticationServiceSpy.register.and.returnValue(of(true));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form-register', () => {
    expect(component).toBeTruthy();
  });

  it('components initial state', () => {
    expect(component).toBeTruthy();
    expect(component.formRegister.invalid).toBeTruthy();
  });

  it('formRegister should be initializade with fields false', () => {
    expect(component.formRegister.valid).toBeFalsy();
    expect(component.formRegister.controls.fullname.valid).toBeFalsy();
    expect(component.formRegister.controls.cpf.valid).toBeFalsy();
    expect(component.formRegister.controls.password.valid).toBeFalsy();
    expect(component.formRegister.controls.email.valid).toBeFalsy();
  });

  it('formRegister fields requirements', () => {

    const fullname = component.formRegister.controls.fullname.errors;
    const cpf = component.formRegister.controls.cpf.errors;
    const password = component.formRegister.controls.password.errors;
    const email = component.formRegister.controls.email.errors;

    expect(fullname.required).toBeTruthy();
    expect(cpf.required).toBeTruthy();
    expect(password.required).toBeTruthy();
    expect(email.required).toBeTruthy();

  });

});
