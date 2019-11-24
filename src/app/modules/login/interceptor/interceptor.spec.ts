import { Interceptor } from './interceptor';
import { TestBed } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import {environment} from '../../../../environments/environment';
import {TokenService} from '../service/token.service';


describe('Interceptor', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Interceptor],
      providers: [ TokenService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    tokenService = TestBed.get(TokenService);

  });

  it('should add an Authorization header', () => {

    tokenService.setAccessToken('JWT-TOKEN-FAKE');

    httpClient.get<any>( `${environment.apiUrl}/user`).subscribe();

    const httpRequest = httpTestingController.expectOne(`${environment.apiUrl}/user`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);

    httpTestingController.verify();
    tokenService.clearAccessToken();
  });

  it('shouldnt add an Authorization header', () => {
    httpClient.get<any>( `${environment.apiUrl}/user`).subscribe();

    const httpRequest = httpTestingController.expectOne(`${environment.apiUrl}/user`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);

    httpTestingController.verify();
  });
});
