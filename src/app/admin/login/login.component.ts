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
    console.log(isLoggedIn);
    if (isLoggedIn) {
      this.router.navigateByUrl('/admin/administrator');
    }
  }

  login(): void {
    const form = {
      email: this.email,
      password: this.password,
    };
    this.authService.login(form).then((res: any) => {
      console.log(res);
      if (res === true) {
        this.router.navigate([`../admin/administrator`]);
      } else {
        this.toastrService.error('Email or password are wrong', 'Login failed');
      }
    });
  }
}
