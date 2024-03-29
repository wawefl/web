import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard.component';
import { SchoolComponent } from './school/school.component';
import { GradeComponent } from './grade/grade.component';
import { StudentComponent } from './student/student.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'administrator', component: AdministratorComponent },
      { path: 'school', component: SchoolComponent },
      { path: 'grade', component: GradeComponent },
      { path: 'student', component: StudentComponent },
      { path: 'lessons', component: LessonComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
