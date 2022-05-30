import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from '../core/layout/layout.component'
import { SharedModule } from '@ba-shared/shared.module'
import { ShopComponent } from './shop/shop.component'
import { EnterpriseComponent } from './enterprise/enterprise.component'
import { SupportComponent } from './support/support.component'

@NgModule({
  declarations: [
    LayoutComponent,
    ShopComponent,
    EnterpriseComponent,
    SupportComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class FeatureModule {}
