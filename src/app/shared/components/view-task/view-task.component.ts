import { Component, Input, OnInit } from '@angular/core';
import { RoutineModel } from '../../models/item.model';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {

  @Input() routineKey;
  _storageData: Promise<RoutineModel[]>;

  constructor(
    public data: RoutineModel,
    private storageService: StorageService,
    ) {
    this._storageData = storageService.initStorageData();
  }

  async ngOnInit() {
    this.data = (await this._storageData).filter(e=>e.routine.key === this.routineKey)[0]
  }
}