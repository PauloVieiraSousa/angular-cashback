import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { LocalStorageMock } from '../../../../../mocks';


describe('TokenService', () => {

  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService]
    });

    service = TestBed.get(TokenService);

    spyOn(localStorage, 'getItem').and.callFake(LocalStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(LocalStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(LocalStorageMock.removeItem);

  });

  afterEach(() => {
    service.clearAccessToken();
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token in localStorage', () => {
    service.setAccessToken('token-jwt-fake');
    expect(localStorage.getItem('token')).toEqual(JSON.stringify('token-jwt-fake'));
  });

  it('should return token from localstorage', () => {
    service.setAccessToken('token-jwt-fake');
    expect(service.getAccessToken()).toEqual('token-jwt-fake');
  });

  it('should return token from localstorage', () => {
    service.clearAccessToken();
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(service.getAccessToken()).toBeNull();
  });

});
