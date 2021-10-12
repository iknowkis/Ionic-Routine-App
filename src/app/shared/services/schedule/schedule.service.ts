import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private storageService: StorageService,
    ) { }

}