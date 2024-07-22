import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabsRoutingModule } from './tabs-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    // FormsModule,
    TabsRoutingModule
  ],
  declarations: [TabsComponent],
  
})
export class TabsPageModule {}
