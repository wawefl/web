import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.authService.isLoggedIn();
    console.log(isLoggedIn);
    if (isLoggedIn) {
      this.router.navigateByUrl('');
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
        this.router.navigate([`../`]);
      } else {
        // this.notifier.notify('error', 'Error');
      }
    });
  }
}
