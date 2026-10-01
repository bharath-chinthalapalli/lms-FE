import { Component } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-user-my-companies',
  templateUrl: './user-my-companies.component.html',
  styleUrls: ['./user-my-companies.component.scss'],
})
export class UserMyCompaniesComponent {
  constructor(public commonService: CommonService) {}
  myCompanyTableHeader: string[] = [
    'S.No',
    'Company Name',
    'Added On',
    'Courses assigned',
    'Courses COMPLETED',
  ];

  myCompanyArray: MyComponies[] = [
    {
      id: 1,
      Course_Name: 'Thrymr Software',
      Added_On: 'Oct 16, 2023',
      courses_assigned: '01',
      courses_completed: '05',
    },
    {
      id: 2,
      Course_Name: 'Nasland Jobs',
      Added_On: 'Jul 20, 2023',
      courses_assigned: '05',
      courses_completed: '15',
    },
    {
      id: 3,
      Course_Name: 'AL mere Constructions',
      Added_On: 'Aug 23, 2023',
      courses_assigned: '06',
      courses_completed: '12',
    },
    {
      id: 4,
      Course_Name: 'CAS constructions',
      Added_On: 'Sep 02, 2023',
      courses_assigned: '08',
      courses_completed: '33',
    },
    {
      id: 5,
      Course_Name: 'AM Security Services',
      Added_On: 'Dec 24, 2023',
      courses_assigned: '09',
      courses_completed: '25',
    },
    {
      id: 6,
      Course_Name: 'MIC Constructions',
      Added_On: 'Oct 16, 2023',
      courses_assigned: '13',
      courses_completed: '20',
    },
  ];
}

export type MyComponies = {
  id: Number;
  Course_Name: String;
  Added_On: String;
  courses_assigned: String;
  courses_completed: String;
};
