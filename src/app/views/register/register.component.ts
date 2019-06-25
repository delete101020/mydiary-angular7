import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(private fb: FormBuilder) { }

  registerForm = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

  }

}
