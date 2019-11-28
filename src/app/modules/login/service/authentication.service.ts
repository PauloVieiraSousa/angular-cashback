import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IPerson} from '../interface/person.interface';
import {environment} from '../../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public login(payload: IPerson): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth`, { payload })
      .pipe(map(user => {
          if (user && user.token) {
            this.tokenService.setAccessToken(user.token);
          }
          return user;
        })
      );
  }


  public register(payload: IPerson): Observable<boolean>{
    return this.http.put<boolean>(`${environment.apiUrl}/register`, { payload })
      .pipe( status => {
        return status;
      });
  }

}
