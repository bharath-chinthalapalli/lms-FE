import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-dashboard-app-card',
  templateUrl: './dashboard-app-card.component.html',
  styleUrls: ['./dashboard-app-card.component.scss'],
})
export class DashboardAppCardComponent {
  @Input() image_url: any;
  @Input() label: any = '';
  @Input() value: any = '';
  constructor(public commonService: CommonService) {}
}
