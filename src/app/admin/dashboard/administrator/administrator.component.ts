import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdministratorService } from 'src/app/services/administrator.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { CreateAdministratorDto } from 'src/app/dto/administrator.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'modify'];
  administrators: any = [];
  dataSource: any;

  formAdministrator!: CreateAdministratorDto;

  @ViewChild('viewFormAdministrator') viewFormAdministrator!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private administratorService: AdministratorService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.administratorService.getAll().subscribe((data: any) => {
      this.administrators = data;
      this.dataSource = new MatTableDataSource(this.administrators);
      if (this.administrators.length > 0) this.dataSource.sort = this.sort;
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

  addAdministrator() {
    this.formAdministrator = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      name: '',
    };
    let dialogRef = this.dialog.open(this.viewFormAdministrator, {
      height: '400px',
      width: '600px',
    });
  }

  modifyAdministrator(administrator: any) {
    this.formAdministrator = {
      id: administrator.id,
      firstName: administrator.firstName,
      lastName: administrator.lastName,
      email: administrator.email,
      password: '',
      name: '',
    };
    let dialogRef = this.dialog.open(this.viewFormAdministrator, {
      height: '400px',
      width: '600px',
    });
  }

  createOrUpdateAdministrator() {
    console.log(this.formAdministrator);
    if (!this.formAdministrator.id) {
      this.formAdministrator = {
        ...this.formAdministrator,
        name: `${this.formAdministrator.firstName} ${this.formAdministrator.lastName}`,
      };
      this.administratorService
        .create(this.formAdministrator)
        .subscribe((admin) => {
          this.updateDataSource();
          console.log(admin);
        });
    } else {
      this.formAdministrator = {
        ...this.formAdministrator,
        name: `${this.formAdministrator.firstName} ${this.formAdministrator.lastName}`,
      };
      this.administratorService
        .update(this.formAdministrator)
        .subscribe((admin) => {
          this.updateDataSource();
          console.log(admin);
        });
    }
    this.dialog.closeAll();
  }

  updateDataSource(): void {
    this.administratorService.getAll().subscribe((admins) => {
      this.administrators = admins;
      this.dataSource = new MatTableDataSource(this.administrators);

      this.dataSource.sort = this.sort;
    });
  }
}
