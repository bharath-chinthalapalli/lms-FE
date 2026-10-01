import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-add-button-icon',
  templateUrl: './add-button-icon.component.html',
  styleUrls: ['./add-button-icon.component.scss']
})
export class AddButtonIconComponent {
  @Input() icon: string = '';
  @Input() btn_text: string = '';
  @Input() svgColor: string = '';
  constructor(public commonService: CommonService) {}
}
