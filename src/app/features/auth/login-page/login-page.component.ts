import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  model: LoginRequest = {
    username: '',
    password: ''
  };

  loading = false;
  error?: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit(): void {
    if (!this.model.username.trim() || !this.model.password) {
      this.error = 'Completează utilizatorul și parola.';
      return;
    }

    this.error = undefined;
    this.loading = true;

    this.auth.login(this.model).subscribe({
      next: user => {
        this.loading = false;
        alert(`Bun venit, ${user.firstName} ${user.lastName}!`);
        this.router.navigateByUrl('/products');
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Utilizator sau parolă incorecte.';
      }
    });
  }
}
