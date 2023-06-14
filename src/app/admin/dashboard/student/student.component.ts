import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'grade', 'modify'];
  students: any = [];
  dataSource: any;

  grades: any;

  formStudent!: any;

  @ViewChild('viewFormStudent') viewFormStudent!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private gradeService: GradeService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gradeService.getAll().subscribe((grades) => {
      this.grades = grades;
      console.log(this.grades);
    });

    this.studentService.getAll().subscribe((students) => {
      console.log(students);
      this.students = students;
      this.dataSource = new MatTableDataSource(this.students);
      if (this.students.length > 0) this.dataSource.sort = this.sort;
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  addStudent() {
    this.formStudent = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      name: '',
      grade: '',
    };
    let dialogRef = this.dialog.open(this.viewFormStudent, {
      height: '400px',
      width: '600px',
    });
  }

  modifyStudent(student: any) {
    this.formStudent = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: '',
      name: '',
      grade: student.gradeId,
    };
    let dialogRef = this.dialog.open(this.viewFormStudent, {
      height: '400px',
      width: '600px',
    });
  }

  createOrUpdateStudent() {
    if (!this.formStudent.id) {
      this.formStudent = {
        ...this.formStudent,
        name: `${this.formStudent.firstName} ${this.formStudent.lastName}`,
      };
      this.studentService.create(this.formStudent).subscribe((student) => {
        console.log(student);
        this.updateDataSource();
      });
    } else {
      this.formStudent = {
        ...this.formStudent,
        name: `${this.formStudent.firstName} ${this.formStudent.lastName}`,
      };
      this.studentService.update(this.formStudent).subscribe((student) => {
        console.log(student);
        this.updateDataSource();
      });
    }
    this.dialog.closeAll();
  }

  updateDataSource(): void {
    this.studentService.getAll().subscribe((students) => {
      this.students = students;
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.sort = this.sort;
    });
  }
}
