import { AuthGuard } from './shared/guards/auth.guard'
import { LoginComponent } from './core/login/login.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './feature/layout/layout.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'web',
    component: LayoutComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
