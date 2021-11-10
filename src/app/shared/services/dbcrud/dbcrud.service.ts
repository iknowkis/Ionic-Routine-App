import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import * as firebase from 'firebase/compat';
import { Posts } from '../../models/db.model';
import { v4 as uuidv4 } from 'uuid';

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

  // this.firestore.collection<any>('posts').doc('posts').collection('Mycomment')

  getBoard() {
    return this.dbBoard.snapshotChanges();
  }
  getAccounts() {
    return this.dbAccounts.snapshotChanges();
  }

  getPosts() {
    return this.dbPosts.snapshotChanges();
  }
  getSelectedPost(id: string){
    return this.dbPosts.doc(id).valueChanges();
  }
  addPost(title: string, content: string, data: any){
    this.dbPosts.add({
      // post_id: uuidv4(),
      post_title: title,
      post_content: content,
      number_liked: 0,
      data: data,
      // date: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }
  deletePost(id: string){
    this.dbPosts.doc(id).delete();
  }





  /**
   * 아이디를 어떻게 불러올 것인지?
   * local Storage Id랑 비교? 
   */

  updatePost(id: string, post: any){
    console.log('DBID: ', id);
    this.firestore
    .collection<any>('board')
    .doc(id)
    .update({...post,
      // date: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }
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