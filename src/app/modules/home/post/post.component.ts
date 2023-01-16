import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../auth/services/user.service';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  public posts:Post[] = [];

  public username:string = "";

  public alreadyliked:boolean = false;

  @Input() post:Post = {
    user:"",
    content:"",
    likes:[],
    replies:[],
    id:0
  }; // decorate the property with @Input()

  constructor(private postService:PostService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.username = this.userService.loggedUser;
    this.post.likes.map((like)=>{
      if(like==this.username)
      {
        this.alreadyliked=true;
      }
    });
  }

  replyForm = new FormGroup({
    text: new FormControl('', [
      Validators.required
    ])
  })

  postForm = new FormGroup({
    content: new FormControl('', [
      Validators.required
    ])
  })

  saveReply(){
    if((this.replyForm.get('text')!.value!).trim().length==0)
    {
      this.replyForm.reset();
    }
    else
    {
    this.postService.saveReply(this.post, this.username + ": " + this.replyForm.get('text')!.value!);
    this.replyForm.reset();
    }
  }

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
    if(this.userService.loggedUser==cpost.user)
    {
      window.alert("You cannot like your own post");
    }
    else
    {
      cpost.likes.map((like)=>{
        if(like==this.userService.loggedUser)
        {
          this.alreadyliked=true;
        }
      })
      if(!this.alreadyliked)
      {
        cpost.likes.push(this.userService.loggedUser);
      }
    const text = document.getElementsByClassName('post-like')[cpost.id] as HTMLElement; 
    text.style.color = 'green';
    }
    this.postService.savePost(cpost);
  }
}
