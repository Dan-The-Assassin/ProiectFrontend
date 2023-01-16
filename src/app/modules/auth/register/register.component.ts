import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import {
  AngularFirestore,
//  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
//import { collection, getDocs, getFirestore } from '@firebase/firestore';
import * as authFire from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users:User[] = [];
  userExists:Boolean = false;

  constructor(private afs: AngularFirestore, private userService:UserService, private router:Router, public afAuth: AngularFireAuth) {
    
   }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  attempt:boolean=true;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  })

  accountUser: User={
    username: '',
    password: ''
  }

registerUser(){
    this.accountUser.username = this.registerForm.get('username')!.value!;
    this.accountUser.password = this.registerForm.get('password')!.value!;

    this.users.map((user)=>{
      if(user.username == this.accountUser.username)
      {
        this.userExists = true;
      }
    })

    
    if(this.registerForm.get('confirmPassword')!.value! == this.registerForm.get('password')!.value!)
    {
      if(this.userExists == false)
      {
      //window.alert("Account created successfuly!");
      //this.userService.saveUser(this.accountUser);
     // this.afs.authFire()
      
      this.afAuth
      .createUserWithEmailAndPassword(this.accountUser.username, this.accountUser.password)
      .then((result) => {
        window.alert("Account created successfuly!");
        this.userService.saveUser(this.accountUser);
        //this.SetUserData(result.user);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
      /*this.afs.collection('Users').add({
        username: this.accountUser.username,
        password: this.accountUser.password
      });*/

      //console.log(this.afs.collection('Users').get());
      //console.log(this.afs.collection('Users').snapshotChanges);
      //const db = getFirestore();
      //const snapshot = getDocs(collection(db,'Users'));
      //snapshot.forEach((doc) => console.log(doc));
      //console.log("test");
      //this.afs.collection('Users').valueChanges().subscribe(data => console.log(data[0]));
     //this.afs.collection('Users')
      

      //this.router.navigate(['/login']);
      
      }
    }
    else
    {
      this.attempt=false;
    }
    }

    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData = {
        uid: null,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      return userRef.set(userData, {
        merge: true,
      });
    }


}
