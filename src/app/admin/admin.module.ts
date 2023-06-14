import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminComponent, LoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
