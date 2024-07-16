import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulsePageRoutingModule } from './pulse-routing.module';

import { PulsePage } from './pulse.page';
import { SiteSelectComponent } from 'src/app/organism/site-select/site-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PulsePageRoutingModule,
  ],
  declarations: [PulsePage, SiteSelectComponent]
})
export class PulsePageModule {}
