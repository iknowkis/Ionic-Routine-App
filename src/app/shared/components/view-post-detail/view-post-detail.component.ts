import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-post-detail',
  templateUrl: './view-post-detail.component.html',
  styleUrls: ['./view-post-detail.component.scss'],
})
export class ViewPostDetailComponent implements OnInit {

  selected_post: any;
  writer_name: any;

  constructor() { }

  ngOnInit() {}

}