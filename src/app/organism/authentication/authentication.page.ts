import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  url:any = '';
  @ViewChild('newSwiper') newSwiper: any;
  constructor(public authenticationService: AuthenticationService, private domSanitizer: DomSanitizer) { }
  async ngOnInit() {
    if(localStorage.getItem('firstView') === 'false'){
      this.authenticationService.firstVisit = false;
    } else if(localStorage.getItem('firstView') === null || localStorage.getItem('firstView') === 'true') {
      localStorage.setItem('firstView', 'true');
      this.authenticationService.firstVisit = true;
    }
  }
  
  async next(){
    this.newSwiper?.nativeElement.swiper.slideNext();
  }

  async back(){
    this.newSwiper?.nativeElement.swiper.slidePrev();
  }

  logActiveIndex() {
    console.log(this.newSwiper?.nativeElement.swiper.activeIndex);
  }

  async skip(index: any) {
    this.newSwiper?.nativeElement.swiper.slideTo(index);
  }

  async login() {
    // let token = environment.token;
    // localStorage.setItem('token', token);
    localStorage.setItem('firstView', 'false');
    // this.authenticationService.router.navigate(['/pulse']);
    window.open(this.authenticationService.webflowAuthUrl, '_self');
  }

}
