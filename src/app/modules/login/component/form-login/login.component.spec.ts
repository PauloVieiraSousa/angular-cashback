import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpClientModule} from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        AuthenticationService,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateFormLogin(userEmail, userPassword) {
    component.formLogin.controls.email.setValue(userEmail);
    component.formLogin.controls.password.setValue(userPassword);
  }

  it('should create component login', () => {
    expect(component).toBeTruthy();
  });

  it('should exist a form with email and password input', fakeAsync (() => {
    updateFormLogin('user@user.com', 'abc123');
    expect(component.formLogin.get('email').value).toEqual('user@user.com');
    expect(component.formLogin.get('password').value).toEqual('abc123');
  }));


});
