import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemsService } from 'src/app/services/items.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
//   name!: string;
  activeFields: any = [];
  constructor(private modalService: ModalController, public itemsService: ItemsService) {}

  ionViewWillEnter() {
    this.activeFields = JSON.parse(localStorage.getItem('activeFields') ?? '');
    console.log(this.activeFields);
  }

  cancel() {
    return this.modalService.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalService.dismiss(null, 'confirm');
  }
}