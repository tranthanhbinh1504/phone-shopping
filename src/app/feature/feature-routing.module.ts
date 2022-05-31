import { SupportComponent } from './support/support.component'
import { EnterpriseComponent } from './enterprise/enterprise.component'
import { ShopComponent } from './shop/shop.component'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'enterprise',
    component: EnterpriseComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
