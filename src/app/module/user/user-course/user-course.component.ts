import { CommonService } from 'src/app/core/services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.scss']
})
export class UserCourseComponent implements OnInit {
  showCardDetails:string = ''
  cardDetailsById:any
  constructor(public _commonService:CommonService){}

  ngOnInit(): void {

  }

  recentViewArray:RecentViewCourse[] = [
    {
      id:1,
      name:'Bedok N2C11',
      task:'3/4 Completed',
      duration:'Approx. Duration - 20 mins',
    },
    {
      id:2,
      name:'Woodland N7C27',
      task:'Successfully Completed',
      duration:'Approx. Duration - 10 mins',
    },
    {
      id:1,
      name:'JLB Casa al mare',
      task:'3/4 Completed',
      duration:'Approx. Duration - 1 Hour',
    }
  ]


  showTheCourseDetails(couserDetails:RecentViewCourse){
    this.showCardDetails = this._commonService.TextEnums.SHOW_CARD_DETAILS
    this.cardDetailsById = couserDetails
  }


  goBackToDashBoard(){
    this.showCardDetails = ''

  }


}

export interface RecentViewCourse {
  id: number;
  name: string;
  task: string;
  duration: string;
}


