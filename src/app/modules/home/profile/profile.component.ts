import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public username:string = ""; 
  public posts:Post[] = [];

  constructor(private postService:PostService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.username = this.userService.loggedUser;
    this.posts = this.postService.getPosts();
  }

  getNrPosts(): number{
    let nrPosts:number=0;
    this.posts.map((post)=>{
      if(post.user==this.username)
      {
        nrPosts++;
      }
    })
    return nrPosts;
  }

  getNrLikes(): number{
    let nrLikes:number=0;

    this.posts.map((post)=>{
      if(post.user==this.username)
      {
        nrLikes = nrLikes + post.likes.length;
      }
    })
    return nrLikes;
  }

  getNrReplies(): number{
    let nrReplies:number=0;

    this.posts.map((post)=>{
      if(post.user==this.username)
      {
        nrReplies = nrReplies + post.replies.length;
      }
    })
    return nrReplies;
  }

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
        console.log(like)
      })
      if(!alreadyliked)
      {
        cpost.likes.push(this.userService.loggedUser);
      }
    const text = document.getElementsByClassName('post-like')[0] as HTMLElement; 
    text.style.color = 'green';
    }
  }
}
