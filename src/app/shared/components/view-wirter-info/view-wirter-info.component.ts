import { Component, Input } from '@angular/core';

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
    let sum = 0;
    data.map(post=> sum = sum + post.number_liked);
    return sum;
  }
  getSumOfImport(data) {
    let sum = 0;
    data.map(post=> sum = sum + post.number_archived);
    return sum;
  }
}