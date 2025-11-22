import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from './auth.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    console.log('Trimitem login:', { username: this.username, password: this.password });

    if (!this.username || !this.password) {
      this.errorMessage = 'Completează email și parola';
      return;
    }

    this.auth.login(this.username, this.password).subscribe({
      next: (resp) => {
        this.auth.saveSession(resp.token, resp.userId);
        this.router.navigate(['/checkout']);
      },
      error: () => {
        this.errorMessage = 'Username sau parolă greșită';
      }
    });
  }
}
