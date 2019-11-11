import {fakeAsync, TestBed, getTestBed, inject} from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import {ILogin} from '../interface/login.interface';
import {environment} from '../../../../environments/environment';

describe('AuthenticationService', () => {

  let injector;
  let httpMock: HttpTestingController;
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(AuthenticationService);
  }
 );

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created authentication service', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<User>', () => {
    const payload: ILogin = {password: 'abc123', email: 'paulo@gmail.com'};
    const dummyUser = {id: '1', avatar:'avatar', name: 'Paulo', token: 'fake-token-jwt'};

    service.login(payload).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/user`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);

  });




});
