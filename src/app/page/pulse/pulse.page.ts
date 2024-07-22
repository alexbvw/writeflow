import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.page.html',
  styleUrls: ['./pulse.page.scss'],
})
export class PulsePage {

  constructor(
    private router: Router, 
    public sitesService: SitesService) { }
  // ngOnInit() {

  // }
  ionViewWillEnter() {

  }
}
