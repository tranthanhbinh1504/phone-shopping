import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SharedModule } from '@ba-shared/shared.module'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [LoginComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
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
