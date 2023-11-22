import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userNotValid: string;
  userNotValidBoolean: boolean = true;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
    });
    localStorage.clear()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.usuario;
      const password = this.loginForm.value.contraseña;
      localStorage.setItem('usuario', username)
      this.loginService
        .authenticateUser(username, password)
        .subscribe((isAuthenticated) => {
          if (!isAuthenticated) {
            this.userNotValidBoolean = false
            this.userNotValid = 'Correo o contraseña inválidos';

          }
        });
    } else {
      this.userNotValid = 'Correo o contraseña inválidos';
    }
  }
}
