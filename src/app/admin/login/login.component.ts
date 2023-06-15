import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.authService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigateByUrl('/admin/student');
    }
  }

  login(): void {
    const form = {
      email: this.email,
      password: this.password,
    };
    this.authService.login(form).then((res: any) => {
      if (res === true) {
        this.router.navigate([`../admin/student`]);
      } else {
        this.toastrService.error('Email or password are wrong', 'Login failed');
      }
    });
  }
}
