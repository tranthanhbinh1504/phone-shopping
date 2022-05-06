import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
