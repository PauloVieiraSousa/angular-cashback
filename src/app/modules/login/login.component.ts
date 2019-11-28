import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `<div class="login"><router-outlet></router-outlet></div>`,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
