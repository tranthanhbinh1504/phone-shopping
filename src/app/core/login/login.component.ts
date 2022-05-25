import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.loginForm = this.fb.group({
        username: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(255),
            ]),
        ],
        password: [
            '',
            Validators.compose([Validators.required])
        ],
    });
  }

  public onSubmit(formValue: any) {
    if (this.loginForm.invalid) return;
    const { username, password } = formValue;
    console.log(username, password)
  }

  get f() {
    return this.loginForm.controls;
  }

}
