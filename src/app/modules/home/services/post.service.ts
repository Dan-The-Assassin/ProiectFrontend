import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { debounceTime, distinctUntilChanged, shareReplay } from 'rxjs';
import { Post } from '../interfaces/post';
import { POSTS } from '../mocking/POSTS';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) { 
    this.afs.collection('Posts').valueChanges().pipe( debounceTime(500)).pipe(distinctUntilChanged()).pipe(shareReplay()).subscribe(
      docs => {
              POSTS.splice(0);
              docs.forEach(doc => POSTS.push(<Post>doc));
              }
    );
  }

  ngOnInit(): void {
    /*this.afs.collection('Posts').valueChanges().subscribe(docs => {
      docs.forEach(doc => console.log(doc))
    });*/
  }

  lastPostId(): number{
    let finalId:number = 0;
    POSTS.map((post)=> {
      finalId = post.id;
    })
    return finalId;
  }
 

  getPosts(): Post[] {
    return POSTS;
  }

   savePost(post:Post) {
    //POSTS.push(post);
     /*this.afs.collection('Posts').add({
        content: post.content,
        id: post.id,
        likes: post.likes,
        replies : post.replies,
        user : post.user
      });*/
    
     const newDoc = this.afs.collection('Posts').doc(post.id.toString()).set({
      content: post.content,
      id: post.id,
      likes: post.likes,
      replies : post.replies,
      user : post.user
     });

     

    // console.log(this.afs.collection('users').doc(post.id.toString()).get());

    /* this.afs.collection('Posts').valueChanges().pipe( debounceTime(500)).pipe(distinctUntilChanged()).pipe(shareReplay()).subscribe(docs => {
        docs.forEach(doc => console.log(doc));
             });*/

             
     //  this.afs.collection('Posts').valueChanges().pipe( debounceTime(500)).pipe(distinctUntilChanged()).subscribe(docs => {
     //   docs.forEach(doc => doc);
     //  });

     // this.afs.collection
      
  }

  saveReply(post:Post,reply:string): any{
    post.replies.push(reply);
    this.savePost(post);
  }
}
