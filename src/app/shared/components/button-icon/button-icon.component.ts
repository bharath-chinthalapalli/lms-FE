import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
})
export class ButtonIconComponent {
  @Input() icon: string = '';
  @Input() btn_text: string = '';
  @Input() svgColor: string = '';
  constructor(public commonService: CommonService) {}
}
