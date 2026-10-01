import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.scss']
})
export class CardCourseComponent {


  @Input() cardDetails:any | undefined




  constructor(public _commonService:CommonService){}


}
