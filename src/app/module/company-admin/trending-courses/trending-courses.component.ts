import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { ThreedotsMenu } from 'src/app/shared/components/three-dots-menu/three-dots-menu';

@Component({
  selector: 'app-trending-courses',
  templateUrl: './trending-courses.component.html',
  styleUrls: ['./trending-courses.component.scss']
})
export class TrendingCoursesComponent {
  @Input() trending_card_data: any;
  @Output() assignCourse = new EventEmitter();
  @Input() threeDotsMenu: ThreedotsMenu[] = [];
  @Input() card_image_data:any;
  @Input() image_url: any;
  @Input() tittle:any;
  @Input() description:any;
  @Input() tags:any;
  @Input() availableTill:any;


  constructor( public _commonService:CommonService){}

  ngOnInit():void{}

  assign() {
    this.assignCourse.emit(true);
  }
}
