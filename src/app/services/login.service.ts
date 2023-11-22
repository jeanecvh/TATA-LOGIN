import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  // Método para autenticar al usuario
  authenticateUser(username: string, password: string): Observable<boolean> {
    // Lógica de autenticación
    if (username === 'test01@gmail.com' && password === 'test01') {
      // Redirige al usuario a la ruta /task si la autenticación es exitosa
      this.router.navigate(['task']);
      return of(true); // Devuelve un observable de true indicando autenticación exitosa
    } else {
      return of(false); // Devuelve un observable de false indicando autenticación fallida
    }
  }
}
