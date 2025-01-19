import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {

  constructor(public authenticationService: AuthenticationService) { }

  async ionViewWillEnter() {
    await this.getAuthorizedUserInfo()
  }

  async getAuthorizedUserInfo() {
    await this.authenticationService.getAuthorizedUserInfo()
    .then(async (res: any) => {
      this.authenticationService.user = JSON.parse(res.response)
      console.log(this.authenticationService.user)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

}
