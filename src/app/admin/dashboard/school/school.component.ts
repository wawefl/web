import { Component, OnInit } from '@angular/core';
import { FromSchoolDto } from 'src/app/dto/school.dto';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
})
export class SchoolComponent implements OnInit {
  formSchool!: FromSchoolDto;

  constructor(private schoolService: SchoolService) {
    this.formSchool = {
      name: '',
      socialNetworks: [{ name: '', url: '' }],
      openingHours: [],
    };
  }

  ngOnInit(): void {
    this.schoolService.get(1).subscribe(
      (school) => {
        if (school !== null) {
          this.formSchool.id = school.id;
          this.formSchool.name = school.name;
          this.formSchool.socialNetworks = school.socialNetworks;
          this.formSchool.openingHours = school.openingHours;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createOrUpdateSchool() {
    if (!this.formSchool.id) {
      this.schoolService.create(this.formSchool).subscribe((school) => {
        this.formSchool = school;
      });
    } else {
      this.schoolService.update(this.formSchool).subscribe((school) => {
        this.formSchool = school;
      });
    }
  }

  addSocialNetwork() {
    this.formSchool.socialNetworks.push({ name: '', url: '' });
  }
}
