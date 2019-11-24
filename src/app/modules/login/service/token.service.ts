import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'token';

  constructor() {}

  public setAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  public getAccessToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return (token) ? JSON.parse(token) : token;
  }

  public clearAccessToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
