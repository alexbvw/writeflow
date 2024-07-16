import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  url:any = '';
  constructor(public authenticationService: AuthenticationService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('hello');
  }

  async login() {
    window.open(this.authenticationService.webflowAuthUrl, '_self');
    // this.url =  this.domSanitizer.bypassSecurityTrustResourceUrl(this.authenticationService.webflowAuthUrl);
    // console.log(this.url);
    // localStorage.setItem('token', 'token');
    // this.authenticationService.router.navigate(['/tabs/pulse']);
  }

}
