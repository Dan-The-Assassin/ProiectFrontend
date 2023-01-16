import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainHeaderComponent } from './main-header/main-header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports : [
    HeaderComponent,
    MainHeaderComponent
  ]
})
export class SharedModule { }
