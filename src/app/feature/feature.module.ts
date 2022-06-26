import { FeatureRoutingModule } from './feature-routing.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from '../core/layout/layout.component'
import { SharedModule } from '@ba-shared/shared.module'
import { ShopComponent } from './shop/shop.component'
import { EnterpriseComponent } from './enterprise/enterprise.component'
import { SupportComponent } from './support/support.component';
import { CartComponent } from './cart/cart.component'

@NgModule({
  imports: [CommonModule, SharedModule, FeatureRoutingModule, SharedModule],
  declarations: [
    LayoutComponent,
    ShopComponent,
    EnterpriseComponent,
    SupportComponent,
    CartComponent,
  ],
})
export class FeatureModule {}
