import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ILogin} from '../interface/login.interface';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  public login(payload: ILogin): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user`, { payload })
      .pipe(map(user => {
          if (user && user.token) {
            localStorage.setItem('token', JSON.stringify(user.token));
          }
          return user;
        })
      );
  }

}
