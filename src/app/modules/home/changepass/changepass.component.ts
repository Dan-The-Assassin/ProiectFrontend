import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../auth/interfaces/user';
import { UserService } from '../../auth/services/user.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {

  users:User[] = [];

  constructor(private userService:UserService, private router:Router, ) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  changepassForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  })

  changePassword(){
    const cpUser = firebase.auth().currentUser;
      if(cpUser?.email==this.userService.loggedUser)
      {
        if(this.userService.loggedPassword==this.changepassForm.get('oldPassword')!.value! && this.changepassForm.get('password')!.value! == this.changepassForm.get('confirmPassword')!.value!)
        {
          if((this.changepassForm.get('password')!.value!).trim().length==0)
          {
            this.changepassForm.reset();
          }
          else
          {
            const credentials = firebase.auth.EmailAuthProvider.credential(cpUser.email, this.changepassForm.get('oldPassword')!.value!);
            cpUser.reauthenticateWithCredential(credentials);
            cpUser.updatePassword(this.changepassForm.get('password')!.value!);
          this.userService.loggedPassword = this.changepassForm.get('password')!.value!;
          this.router.navigate(['/profile']);
          }
        }
      }
  }
}
