import { Component } from '@angular/core';
import { SitesService } from './services/sites.service';
import { ItemsService } from './services/items.service';
import { CollectionsService } from './services/collections.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public itemsService: ItemsService,
    public sitesService: SitesService,
    public collectionsService: CollectionsService,
    ) {}
}
