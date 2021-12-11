import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import * as firebase from 'firebase/compat';
import { Account, Post } from '../../models/db.model';
import { v4 as uuidv4 } from 'uuid';
import { RoutineModel } from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class DbcrudService {

  constructor(
    // public db: AngularFireDatabase,
    public firestore: AngularFirestore,
  ) {
  }

  dbPosts = this.firestore.collection<any>('posts', (ref) => ref);
  dbAccounts = this.firestore.collection<any>('accounts', (ref) => ref);

  getAccounts() {
    return this.dbAccounts.snapshotChanges();
  }
  getSelectedAccount(id: string){
    return this.dbAccounts.doc(id).valueChanges();
  }
  addAccount(account: Account){
    this.dbAccounts.add({
      name: account.name,
      password: account.password,
    });
  }
  updateAccount(id: string, account: Account){
    this.dbAccounts.doc(id).update({...{
      name: account.name,
      password: account.password,
    },
    });
  }

  getPosts() {
    return this.dbPosts.snapshotChanges();
  }
  getSelectedPost(id: string){
    return this.dbPosts.doc(id).valueChanges();
  }
  addPost(title: string, content: string, data: RoutineModel, account_id: string){
    this.dbPosts.add({
      post_title: title,
      post_content: content,
      writer_id: account_id,
      number_liked: 0,
      number_archived: 0,
      data: data,
      //numOfPost
    });
  }
  updatePost(title: string, content: string, data: RoutineModel, post_id: string){
    this.dbPosts.doc(post_id).update({...
      {
      post_title: title,
      post_content: content,
      data: data,
      }
    });
  }
  updatePost_LikeOrImport(id: string, post: Post){
    this.dbPosts.doc(id).update({...post,
      // date: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }
  deletePost(id: string){
    this.dbPosts.doc(id).delete();
  }
}


/*

// 댓글
getComments(id: any) {
    return this.firestore
      .collection('board')
      .doc(id)
      .collection<Comments>('Mycomment', (ref) =>
      ref.orderBy('date') ).snapshotChanges();
}
AddComment(id: string, comments: Comments) {
  this.firestore
  .collection('board')
  .doc(id)
  .collection('Mycomment')
  .add({...comments,
    date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}
deleteComment(PostId: string, CommentId: string){
  this.firestore
  .collection('board')
  .doc(PostId)
  .collection('Mycomment')
  .doc(CommentId)
  .delete();
}

/* post-detail할 때 표시 방법 중 하나
  this.firestore.collection<Post>('board').snapshotChanges()
  .pipe(
       tap(list => this.list = list)
       );

// 다른 방법
  this.postService.getPosts().subscribe(data => {
    this.posts = data.map((e: any) => {
       return {
         id:e.payload.doc.id,
         ...e.payload.doc.data()
       } as Post;
  })
*/