
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { Stylist } from '../model/stylist';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userId:any;
  user:any;
  decoded:any;
  firstVisit = false;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  webflowAuthUrl = `${environment.webflow_auth_url}?client_id=${environment.client_id}&response_type=${environment.response_type}&scope=${environment.scope}&redirect_uri=${environment.redirect_uri}&state=${environment.state}`;

  constructor(
    public router: Router,
    private http: HttpClient,
    public toastController: ToastController
  ) { this.isLoggedIn }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      cssClass: 'toast-message',
      message: message,
      duration: 2585
    });
    toast.present();
  }
  async requestToken(code:any) {
    let api = `${environment.webflow_service_url}token?code=${code}`;
    return firstValueFrom(this.http.post<any>(api, {}));
  }

  async getAuthorizedUserInfo(){
    let api = `${environment.webflow_service_url}user`;
    let token = this.getToken();
    // console.log(token);
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.get<any>(api, { headers: this.headers }));
  }

  //Get JWT TOKEN from localstorage
  getToken(){
    return localStorage.getItem('token');
  }

  //Check if Stylist is Logged in 
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  //Logout Stylist
  logout(){
    let removeToken = localStorage.removeItem('token');
    if(removeToken == null) {
      this.firstVisit = false;
      this.router.navigateByUrl('authentication');
      // window.open('/', '_self');
    }
  }
  
}
