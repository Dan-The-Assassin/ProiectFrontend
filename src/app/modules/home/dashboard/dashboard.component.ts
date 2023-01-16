import { Component, OnInit } from '@angular/core';
import { POSTS } from '../mocking/POSTS';
import { PostService } from '../services/post.service';
import { Post } from '../interfaces/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public posts:Post[] = [];

  constructor(private postService:PostService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  postForm = new FormGroup({
    content: new FormControl('', [
      Validators.required
    ])
  })

  postContent: Post={
    user:"",
    content:"",
    likes:[],
    replies:[],
    id:0
  }

  /*logoutUser(){
    this.userService.isLogged=false;
    this.userService.loggedUser="";
    this.router.navigate(['/login']);
  }*/

  addLike(cpost:Post){
    let alreadyliked:boolean=false;
    if(this.userService.loggedUser==cpost.user)
    {
      window.alert("You cannot like your own post");
    }
    else
    {
      cpost.likes.map((like)=>{
        if(like==this.userService.loggedUser)
        {
          alreadyliked=true;
        }
      })
      if(!alreadyliked)
      {
        cpost.likes.push(this.userService.loggedUser);
        this.postService.savePost(cpost);
      }
      const text = document.getElementsByClassName('post-like')[cpost.id] as HTMLElement; 
    text.style.color = 'green';
    }
  }

  addPost(){
    if((this.postForm.get('content')!.value!).trim().length==0)
    {
      this.postForm.reset();
    }
    else
    {
    this.postContent.user = this.userService.loggedUser;
    this.postContent.content = this.postForm.get('content')!.value!;
    this.postContent.id = this.postService.lastPostId() + 1;

    this.postService.savePost(this.postContent);
    this.postContent={
      user:"",
      content:"",
      likes:[],
      replies:[],
      id:0
    }
    //console.log(this.postService.getPosts());
    this.postForm.reset();
    }
  }

}
