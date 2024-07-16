import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-site-select',
  templateUrl: './site-select.component.html',
  styleUrls: ['./site-select.component.scss'],
})
export class SiteSelectComponent  implements OnInit {

  constructor(public sitesService: SitesService) { }

  async ngOnInit() {
    await this.getSites();
  }

  async getSites(){
    await this.sitesService.getSites()
    .then((res: any) => {
      console.log(res?.sites)
      this.sitesService.sites = res?.sites;
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

}
