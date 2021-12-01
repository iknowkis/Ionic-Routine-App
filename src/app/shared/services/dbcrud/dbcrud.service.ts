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

  dbBoard = this.firestore.collection<any>('board', (ref) => ref);
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
  updatePost(id: string, post: Post){
    this.dbPosts.doc(id).update({...post,
      // date: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }

  
  //아직
  deletePost(id: string){
    this.dbPosts.doc(id).delete();
  }
  getBoard() {
    return this.dbBoard.snapshotChanges();
  }
  /**
   * 아이디를 어떻게 불러올 것인지?
   * local Storage Id랑 비교? 
   */
 // this.firestore.collection<any>('posts').doc('posts').collection('Mycomment')


}


/*
import { Post, Comments } from 'src/app/item.model';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private firestore: AngularFirestore
    ) { }

createPost(post: Post){
  this.firestore.collection<Post>('board')
  .add({...post,
    date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}

updatePost(id: string, post: Post){
  this.firestore.collection<Post>('board').doc(id)
  .update({...post,
    date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}

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


}

/* post-detail할 때 표시 방법 중 하나
  this.firestore.collection<Post>('board').snapshotChanges()
  .pipe(
       tap(list => this.list = list)
       );



       
  this.postService.getPosts().subscribe(data => {
    this.posts = data.map((e: any) => {
       return {
         id:e.payload.doc.id,
         ...e.payload.doc.data()
       } as Post;
  })
*/