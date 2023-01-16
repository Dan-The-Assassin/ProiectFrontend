import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { ChangepassComponent } from './changepass/changepass.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    PostComponent,
    ChangepassComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    ChangepassComponent
  ]
})
export class HomeModule { }
