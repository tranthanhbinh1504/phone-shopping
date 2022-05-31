import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatPaginatorModule } from '@angular/material/paginator'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FakeBEInterceptor } from './interceptors/fake-backend.interceptor'
import { JWTInterceptor } from './interceptors/jwt.interceptor'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from 'src/environments/environment'

const materialModules = [
  MatDialogModule,
  MatIconModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatProgressBarModule,
]

const angularModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserModule,
]

@NgModule({
  declarations: [],
  imports: [...angularModules, ...materialModules],
  providers: [
    { provide: 'BASE_URL', useValue: '' },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBEInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  ],
})
export class SharedModule {}
