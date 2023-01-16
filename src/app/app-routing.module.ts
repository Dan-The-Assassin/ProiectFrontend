import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { LoginGuard } from './modules/auth/services/login.guard';
import { ProfileComponent } from './modules/home/profile/profile.component';
import { ChangepassComponent } from './modules/home/changepass/changepass.component';

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },

  {
    path: "register", component :RegisterComponent
  },
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path: "dashboard", component :DashboardComponent, canActivate:[LoginGuard]},
  {path: "profile", component :ProfileComponent, canActivate:[LoginGuard]},
  {path: "changepass", component :ChangepassComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
