import { Component, Input } from '@angular/core';
import { getSumOfImport_util, getSumOfLikes_util } from '../../util/data.util';

@Component({
  selector: 'app-view-wirter-info',
  templateUrl: './view-wirter-info.component.html',
  styleUrls: ['./view-wirter-info.component.scss'],
})
export class ViewWirterInfoComponent {
  @Input() dbPosts: any;
  @Input() writer_name: string;

  constructor(
    ) {
    }
  
  getSumOfLikes(data) {
    return getSumOfLikes_util(data);
  }
  getSumOfImport(data) {
    return getSumOfImport_util(data);
  }
}