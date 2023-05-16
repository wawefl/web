import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { GradeService } from 'src/app/services/grade.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'level', 'modify'];
  grades: any = [];
  dataSource: any;

  formGrade!: any;

  @ViewChild('viewFormGrade') viewFormGrade!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private gradeService: GradeService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gradeService.getAll().subscribe((grades) => {
      this.grades = grades;
      this.dataSource = new MatTableDataSource(this.grades);
      console.log(this.grades);
    });
  }

  ngAfterViewInit() {
    if (this.grades.length > 0) this.dataSource.sort = this.sort;
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

  addGrade() {
    this.formGrade = {
      name: '',
      email: '',
      level: '',
    };
    let dialogRef = this.dialog.open(this.viewFormGrade, {
      height: '400px',
      width: '600px',
    });
  }

  modifyGrade(grade: any) {
    this.formGrade = {
      id: grade.id,
      name: grade.name,
      email: grade.email,
      level: grade.level,
    };
    let dialogRef = this.dialog.open(this.viewFormGrade, {
      height: '400px',
      width: '600px',
    });
  }

  createOrUpdateGrade() {
    console.log(this.formGrade);
    if (!this.formGrade.id) {
      this.gradeService.create(this.formGrade).subscribe((grade) => {
        console.log(grade);
      });
    } else {
      this.gradeService.update(this.formGrade).subscribe((grade) => {
        console.log(grade);
      });
    }
    this.dialog.closeAll();
  }
}
