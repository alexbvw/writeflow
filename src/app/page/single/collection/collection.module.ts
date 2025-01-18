import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CollectionPage } from './collection.page';
import { CollectionPageRoutingModule } from './collection-routing.module';
import { AddItemComponent } from 'src/app/organism/add-item/add-item.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionPageRoutingModule
  ],
  declarations: [CollectionPage, AddItemComponent]
})
export class CollectionPageModule {}
