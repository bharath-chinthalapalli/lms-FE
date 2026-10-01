import { Component } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-user-certifications',
  templateUrl: './user-certifications.component.html',
  styleUrls: ['./user-certifications.component.scss'],
})
export class UserCertificationsComponent {
  constructor(public commonService: CommonService) {}

  certificatedTableHeader: string[] = [
    'S.No',
    'Course Name',
    'Company',
    'Certification ID',
    'Completed On',
  ];

  certificatedArray: Certificates[] = [
    {
      id: 1,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 2,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 3,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 4,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 5,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 6,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 7,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 8,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 9,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 10,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 11,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
    {
      id: 12,
      Course_Name: 'Bedok N2C11',
      Company: 'Bedok N2C11',
      certification_id: 'CS45683219VGJ',
      completed_On: 'Oct 16, 2023',
    },
  ];
}

export type Certificates = {
  id: Number;
  Course_Name: String;
  Company: String;
  certification_id: String;
  completed_On: String;
};
