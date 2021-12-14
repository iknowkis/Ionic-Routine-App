import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/shared/services/util/util.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage {

  @Output() dbPosts: any;
  @Output() writer_name: string;

  constructor(
    private route: ActivatedRoute,

    private util: UtilService,
    ) {
      let account_id = this.route.snapshot.params.account_id;
      this.getWriterInfo(account_id);
      this.getPostsData(account_id);
    }

  getWriterInfo(id: string) {
    this.util.getWriterInfo(id).then(name => this.writer_name = name);
  }
  getPostsData(id: string) {
    this.util.getPosts_Selected(id).then(posts => this.dbPosts = posts);
  }
}