import { IonTabs } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @ViewChild('tabs') tabs!: IonTabs;
  menuType: string = 'overlay';
  constructor(public authenticationService: AuthenticationService) { }

  // ngOnInit() {
  //   console.log('hello');
  // }


  onSwipe(event:any) {
    // console.log(event)
    if(event?.swipeType == 'moving') {
      console.log(event);
      const currentTab = this.tabs.getSelected();
      console.log('currentTab: ', currentTab);
      const nextTab = this.getNextTab(currentTab, event?.dirX);
      console.log(nextTab);
      if(nextTab) this.tabs.select(nextTab);
    }
  }

  getNextTab(currentTab:any, direction:any) {
    switch(currentTab) {
      case 'pulse': if(direction == 'left') return 'account'; else return 'account';
      case 'account': if(direction == 'right') return 'pulse'; else return 'pulse';
    }
    return null;
  }

}
