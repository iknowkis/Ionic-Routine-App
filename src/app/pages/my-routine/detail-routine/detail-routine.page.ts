import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { ComposeTaskComponent } from 'src/app/modals/compose-task/compose-task.component';

@Component({
  selector: 'app-detail-routine',
  templateUrl: './detail-routine.page.html',
  styleUrls: ['./detail-routine.page.scss'],
})
export class DetailRoutinePage implements OnInit {

  @Output() _routineKey: string;
  routineTitle: string;

  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let routine = this.route.snapshot.params;
    this.routineTitle = routine.title;
    this._routineKey = routine.key;
  }

  async openComposeTaskModal() {
    const modal = await this.modalController.create({
      component: ComposeTaskComponent,
      componentProps: {
        routineKey: this._routineKey,
      }
    });
    modal.onDidDismiss().then(async () => {
    });
    return modal.present();
  }
}