import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  menuType: string = 'overlay';
  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    console.log('hello');
  }

  async logout(){
    this.authenticationService.logout();
  }

}
