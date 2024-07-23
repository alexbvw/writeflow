import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage {
  url:any = '';
  constructor(public authenticationService: AuthenticationService, private domSanitizer: DomSanitizer) { }
  token:any = "b6e35b763b541d2cec26d61c8cf15e2fe13c85b2f504122a15c0496d4c6c394a"
  // ngOnInit() {
  //   console.log('hello');
  // }

  async login() {
    // localStorage.setItem('token', this.token);
    // this.authenticationService.router.navigate(['/tabs/pulse']);
    window.open(this.authenticationService.webflowAuthUrl, '_self');
  }

}
