import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MainComponent } from './main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StudentComponent } from './student/student.component';
import { GradeComponent } from './grade/grade.component';
import { SchoolComponent } from './school/school.component';
import { LessonComponent } from './lesson/lesson.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MtxNativeDatetimeModule } from '@ng-matero/extensions/core';
import { MatSortModule } from '@angular/material/sort';

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
    MatIconModule,
    MatGridListModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MtxDatetimepickerModule,
    MtxNativeDatetimeModule,
  ],
})
export class DashboardModule {}
