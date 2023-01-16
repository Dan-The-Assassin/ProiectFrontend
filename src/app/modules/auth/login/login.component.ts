import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS } from '../mocking/USERS';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  attempt:boolean = true;

  accountForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  tryLogin(): any{
  //  let exists:Boolean = false;
   // let pass:string = "";
    USERS.map((user) => {
      if(user.username == this.accountForm.get('username')!.value!)
      {
        if(user.password == this.accountForm.get('password')!.value!)
        {
         // exists = true;
          this.userService.loggedUser = user.username;
         // pass = user.password;
        }
        else
        {
          console.log("bad password");
          this.attempt = false;
        }
      }
    })
   // if(exists == true)
   // {
      this.afAuth
      .signInWithEmailAndPassword(this.accountForm.get('username')!.value!, this.accountForm.get('password')!.value!)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/dashboard']);
             
            if(user.email!=null)
            {
            this.userService.loggedUser = user.email;
            this.userService.loggedPassword = this.accountForm.get('password')!.value!
            }
            this.userService.isLogged=true;
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
      //this.router.navigate(['/dashboard']);
      //this.userService.isLogged=true;
  //  }
}

}
