import { AuthenticationService } from '@ba-shared/services/authentication.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { debounceTime, first } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any
  public submitted = false
  private returnUrl: string = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || 'web'
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  public onSubmit(formValue: any) {
    this.submitted = true
    if (this.loginForm.invalid) return
    const { email, password } = formValue
    this.authenticationService
      .login(email, password)
      .pipe(debounceTime(2000), first())
      .subscribe(
        (res) => {
          if (res) {
            this.router.navigate([this.returnUrl])
          }
        },
        (error) => {
          console.log(error)
          this.loginForm.setErrors({
            usernameOrPasswordIncorrect: error,
          })
        }
      )
  }

  get f() {
    return this.loginForm.controls
  }
}
