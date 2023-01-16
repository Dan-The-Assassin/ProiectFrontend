import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { USERS } from '../mocking/USERS';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isLogged:boolean = false;
  loggedUser:string = "";
  loggedPassword:string = "";

  getUsers(): User[] {
    return USERS;
  }

  saveUser(user:User): any {
    USERS.push(user);
  }
}
