import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CollectionsPage } from './collections.page';
import { CollectionsPageRoutingModule } from './collections-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionsPageRoutingModule
  ],
  declarations: [CollectionsPage]
})
export class CollectionPageModule {}
