import { Component, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { ThreedotsMenu } from 'src/app/shared/components/three-dots-menu/three-dots-menu';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';
import { SuperAdminService } from '../super-admin.service';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss'],
})
export class SuperAdminDashboardComponent {
  @ViewChild(PlaceholderDirective, { static: false })

  loadPopup!: PlaceholderDirective;
  dashboardCardArray:any= '';

  constructor(
    public commonService: CommonService,
    private _service:SuperAdminService,
    private _toastr:ToastrService

  ) {}

  ngOnInit():void{
    this.getStatusCardDetails();
  }

  getStatusCardDetails(){
    this._service.getStatusCardDetailsApi().subscribe({
      next:(response:any)=>{
        if(  response.code == HttpStatusCode.Ok){
          this.dashboardCardArray = response.data;
          console.log(this.dashboardCardArray);
          
          // this._customToastrService.success(response.message, "Success");
          // this._toastr.success(response.message,'Success')

        }
        else{
        }
      },
     
    })
  }

  // dashboardCardArray: DashboardCard[] = [
  //   {
  //     name: 'Total Courses',
  //     totalCourses: '120',
  //     image_url: this.commonService.Images.SUPER_ADMIN_APP_COURSE_ICON,
  //   },
  //   {
  //     name: 'Active Courses',
  //     totalCourses: '80',
  //     image_url: this.commonService.Images.ACTIVE_COURSE_ICON,
  //   },
  //   {
  //     name: 'Most Purchased course ',
  //     totalCourses: 'Bedok N2C11',
  //     image_url: this.commonService.Images.MOST_PURCHASED_COURSE_ICON,
  //   },
  //   {
  //     name: 'Total Organisations',
  //     totalCourses: '20',
  //     image_url: this.commonService.Images.TOTAL_ORGANISATION_ICON,
  //   },
  //   {
  //     name: 'Total Users',
  //     totalCourses: '120',
  //     image_url: this.commonService.Images.TOTAL_USERS_ICON,
  //   },
  //   {
  //     name: 'Total Certificates',
  //     totalCourses: '50',
  //     image_url: this.commonService.Images.TOTAL_CERTIFICATED_ICON,
  //   },
  // ];

  super_admin_card_data: any = [
    {
      id: 1,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
    {
      id: 2,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
    {
      id: 3,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
  ];
  threeDotsMenuOption: ThreedotsMenu[] = [
    {
      text: this.commonService.TextEnums.EDIT_TEXT,
      icon: this.commonService.Images.EDIT_ICON,
      clickHandler: (event: Event) => {
        console.log(event);
      },
    },
    {
      text: this.commonService.TextEnums.MAKE_INACTIVE_TEXT,
      icon: this.commonService.Images.INACTIVE_ICON,
      clickHandler: (event: Event) => {
        this.commonService.openGenericPopup(
          this.loadPopup,
          this.commonService.TextEnums.ACTIVE_INACTIVE_POPUP
        );
      },
    },
  ];


}

export type DashboardCard = {
  name: String;
  totalCourses: String;
  image_url: String;
};
