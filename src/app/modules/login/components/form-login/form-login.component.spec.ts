import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import { FormLoginComponent } from './form-login.component';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';


const formBuilder: FormBuilder = new FormBuilder();
const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);

const validUser = {
  email: 'example@example.com',
  password: 'defgh123'
};

const blankUser = {
  email: '',
  password: ''
};


describe('FormLoginComponent', () => {

  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let authenticateSpy;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy },
        {provide: Router, useValue: routerSpy},
        {provide: FormBuilder, useValue: formBuilder},
        {provide: ToastrService, useValue: toastrServiceSpy}
      ]
    }).compileComponents();

    authenticateSpy = authenticationServiceSpy.login.and.returnValue(of({token: 'jwt-token-fake'}));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateFormLogin(userEmail, userPassword) {
    component.formLogin.controls.email.setValue(userEmail);
    component.formLogin.controls.password.setValue(userPassword);
  }

  it('components initial state', () => {
    expect(component).toBeTruthy();
    expect(component.loading).toBeFalsy();
    expect(component.submitted).toBeFalsy();
    expect(component.formLogin.invalid).toBeTruthy();
  });

  it('should validate form login and inputs are false', () => {
    expect(component.formLogin.valid).toBeFalsy();
    expect(component.formLogin.controls.password.valid).toBeFalsy();
    expect(component.formLogin.controls.email.valid).toBeFalsy();
  });

  it('should validate email and password field are required', () => {
    const emailErrors = component.formLogin.controls.email.errors || {};
    const passwordErrors = component.formLogin.controls.password.errors || {};

    expect(emailErrors.required).toBeTruthy();
    expect(passwordErrors.required).toBeTruthy();
  });

  it('should validate password field required', () => {
    component.formLogin.controls.password.setValue(validUser.password);
    const errors = component.formLogin.controls.password.errors || {};
    expect(errors.required).toBeFalsy();
  });



  it('should validate email field required', () => {
    const errors = component.formLogin.controls.email.errors || {};
    expect(errors.required).toBeTruthy();
  });

  it('should validate email field required', () => {
    component.formLogin.controls.email.setValue(validUser.email);
    const errors = component.formLogin.controls.email.errors || {};
    expect(errors.required).toBeFalsy();
  });


  it('should exist a form with email and password input', fakeAsync (() => {
    updateFormLogin(validUser.email, validUser.password);
    expect(component.formLogin.get('email').value).toEqual(validUser.email);
    expect(component.formLogin.get('password').value).toEqual(validUser.password);
  }));

  it('must call onSubmit method with a valid user', fakeAsync (() => {
    component.onSubmit(validUser);
    expect(component.submitted).toBe(true);
  }));


  it('created a form with username and password input and login button', () => {
    const email = fixture.debugElement.nativeElement.querySelector('.input-email');
    const password = fixture.debugElement.nativeElement.querySelector('.input-password');
    const submitButton = fixture.debugElement.nativeElement.querySelector('.btn-form-submit');

    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(submitButton).toBeDefined();
  });


  it('should route to dashboard if authentication with success', fakeAsync (() => {
    component.onSubmit(validUser);
    advance(fixture);
    authenticateSpy = authenticationServiceSpy.login.and.returnValue(Promise.resolve({token: 'jwt-token-fake'}));
    advance(fixture);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl.calls.first().args[0]).toBe('/dashboard', 'should nav to dashboard');
  }));


  function advance( fix: ComponentFixture<any>) {
    tick();
    fix.detectChanges();
  }

});
