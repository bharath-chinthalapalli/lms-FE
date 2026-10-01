import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { ThreedotsMenu } from '../three-dots-menu/three-dots-menu';

@Component({
  selector: 'app-lms-table',
  templateUrl: './lms-table.component.html',
  styleUrls: ['./lms-table.component.scss'],
})
export class LmsTableComponent {
  @Input() TableTheadArray: any = [];
  @Input() TableTBodyArray: any = [];
  @Input() TableType: any = [];
  @Input() threeDotMenOption: ThreedotsMenu[] = [];
  constructor(public commonService: CommonService) {}

  ngOnInit():void{
    console.log(this.threeDotMenOption)
  }
}
