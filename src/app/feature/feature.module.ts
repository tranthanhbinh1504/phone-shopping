import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from './layout/layout.component'
import { SharedModule } from '@ba-shared/shared.module'

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, SharedModule],
})
export class FeatureModule {}
