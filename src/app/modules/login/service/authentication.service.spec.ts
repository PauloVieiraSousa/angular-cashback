import {fakeAsync, TestBed, getTestBed, inject} from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import {IPerson} from '../interface/person.interface';
import {environment} from '../../../../environments/environment';
import {TokenService} from './token.service';

describe('AuthenticationService', () => {

  let injector;
  let httpMock: HttpTestingController;
  let service: AuthenticationService;
  let tokenService: TokenService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, TokenService]
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    tokenService = injector.get(TokenService);
    service = injector.get(AuthenticationService);
  }
 );

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created authentication service', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable <User> logged', () => {
    const payload: IPerson = {password: 'abc123', email: 'paulo@gmail.com'};
    const dummyUser = {token: 'fake-token-jwt'};

    service.login(payload).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);

  });


  it('should return an Observable with status true for successful resgister user', () => {
    const payload: IPerson = {fullname: 'Paulo Exemplo', cpf: '25878965412', email: 'pauloexemplo@gmail.com', password: 'abc123'};

    service.register(payload).subscribe( (status) => {
      expect(status).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/register`);
    expect(req.request.method).toBe('PUT');
  });

});
