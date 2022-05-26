import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SharedModule } from '@ba-shared/shared.module'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { LoginComponent } from './login/login.component'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // BrowserModule,
    // FormsModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('Only import in AppModule')
    }
  }
}
