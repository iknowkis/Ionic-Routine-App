import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineModel } from '../../models/item.model';
import { WeekdayUtil } from '../../models/weekday.model';
import { StorageService } from '../../services/storage/storage.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-view-routine',
  templateUrl: './view-routine.component.html',
  styleUrls: ['./view-routine.component.scss'],
})
export class ViewRoutineComponent {

  @Input() storageData;

  constructor(
    public theme: ThemeService,
  ) {
    this.theme.initTheme();
  }

  getTimerOn(data) {
    return `${new Date(data.routine.value.timerOn).getHours()} : ${new Date(data.routine.value.timerOn).getMinutes()}`
  }
  getDayName(data) {
    let arr = [];
    data.routine.value.weekday.map(e=> arr.push(WeekdayUtil.getDayName(e).slice(0,3).toUpperCase()));
    return arr.join(' ');
  }
}