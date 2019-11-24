import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ILogin} from '../interface/login.interface';
import {environment} from '../../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public login(payload: ILogin): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth`, { payload })
      .pipe(map(user => {
          if (user && user.token) {
            this.tokenService.setAccessToken(user.token);
          }
          return user;
        })
      );
  }

}
