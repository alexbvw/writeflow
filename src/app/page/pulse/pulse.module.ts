import { NgModule } from '@angular/core';
import { PulsePage } from './pulse.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PulsePageRoutingModule } from './pulse-routing.module';
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
