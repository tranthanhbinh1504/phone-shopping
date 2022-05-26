import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any
  private submitted = false

  constructor(private fb: FormBuilder, private router: Router) {}

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
    console.log(email, password)
  }

  get f() {
    return this.loginForm.controls
  }
}
