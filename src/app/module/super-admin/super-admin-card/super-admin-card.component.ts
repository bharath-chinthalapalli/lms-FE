import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { ThreedotsMenu } from 'src/app/shared/components/three-dots-menu/three-dots-menu';

@Component({
  selector: 'app-super-admin-card',
  templateUrl: './super-admin-card.component.html',
  styleUrls: ['./super-admin-card.component.scss'],
})
export class SuperAdminCardComponent implements OnInit {
  @Input() super_card_data: any;
  @Output() assignCourse = new EventEmitter();
  @Input() threeDotsMenu: ThreedotsMenu[] = [];
  @Input() image_url: any;


  constructor(public _commonService: CommonService) {}

  ngOnInit(): void {}
  assign() {
    this.assignCourse.emit(true);
  }
}
