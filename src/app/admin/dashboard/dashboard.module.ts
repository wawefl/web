import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MainComponent } from './main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StudentComponent } from './student/student.component';
import { GradeComponent } from './grade/grade.component';
import { SchoolComponent } from './school/school.component';
import { LessonComponent } from './lesson/lesson.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    AdministratorComponent,
    MainComponent,
    StudentComponent,
    GradeComponent,
    SchoolComponent,
    LessonComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatTreeModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
