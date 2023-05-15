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
          console.log(school);
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
    console.log(this.formSchool);
    if (!this.formSchool.id) {
      this.schoolService.create(this.formSchool).subscribe((school) => {
        console.log('Create School');
        this.formSchool = school;
        console.log(this.formSchool);
      });
    } else {
      this.schoolService.update(this.formSchool).subscribe((school) => {
        console.log('Update School');
        this.formSchool = school;
        console.log(this.formSchool);
      });
    }
  }

  addSocialNetwork() {
    this.formSchool.socialNetworks.push({ name: '', url: '' });
  }
}
