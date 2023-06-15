import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { GradeService } from 'src/app/services/grade.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'dateStart',
    'dateEnd',
    'grade',
    'modify',
  ];
  lessons: any = [];
  dataSource: any;

  grades: any;

  formLesson!: any;

  @ViewChild('viewFormLesson') viewFormLesson!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  datetime: any;
  times: { code: number; name: string }[] = [
    {
      code: 15,
      name: '15min',
    },
    {
      code: 30,
      name: '30min',
    },
    {
      code: 45,
      name: '45min',
    },
    {
      code: 60,
      name: '60min',
    },
    {
      code: 90,
      name: '1h30',
    },
    {
      code: 120,
      name: '2h',
    },
  ];

  constructor(
    private lessonService: LessonService,
    private gradeService: GradeService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gradeService.getAll().subscribe((grades) => {
      this.grades = grades;
    });
    this.lessonService.getAll().subscribe((lessons) => {
      this.lessons = lessons;
      this.dataSource = new MatTableDataSource(this.lessons);

      if (this.lessons.length > 0) this.dataSource.sort = this.sort;
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

  addLesson() {
    this.formLesson = {
      name: '',
      dateStart: null,
      dateEnd: null,
      grade: '',
    };
    let dialogRef = this.dialog.open(this.viewFormLesson, {
      height: '400px',
      width: '600px',
    });
  }

  modifyLesson(lesson: any) {
    const start = moment(new Date(lesson.dateStart));
    const end = moment(new Date(lesson.dateEnd));

    this.formLesson = {
      id: lesson.id,
      name: lesson.name,
      dateStart: new Date(lesson.dateStart),
      dateEnd: moment.duration(end.diff(start)).asMinutes(),
      grade: lesson.gradeId,
    };

    let dialogRef = this.dialog.open(this.viewFormLesson, {
      height: '400px',
      width: '600px',
    });
  }

  createOrUpdateLesson() {
    this.formLesson = {
      ...this.formLesson,
      dateEnd: moment(this.formLesson.dateStart).add(
        this.formLesson.dateEnd,
        'm'
      ),
    };

    if (!this.formLesson.id) {
      this.lessonService.create(this.formLesson).subscribe((lesson) => {
        this.updateDataSource();
      });
    } else {
      this.lessonService.update(this.formLesson).subscribe((lesson) => {
        this.updateDataSource();
      });
    }
    this.dialog.closeAll();
  }

  updateDataSource(): void {
    this.lessonService.getAll().subscribe((lessons) => {
      this.lessons = lessons;
      this.dataSource = new MatTableDataSource(this.lessons);

      this.dataSource.sort = this.sort;
    });
  }
}
