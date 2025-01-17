import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabsRoutingModule } from './tabs-routing.module';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DirectivesModule,
    TabsRoutingModule
  ],
  declarations: [TabsComponent],
  
})
export class TabsPageModule {}
