import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonService } from 'src/app/core/services/common.service';
import { ThreedotsMenu } from './three-dots-menu';

@Component({
  selector: 'app-three-dots-menu',
  templateUrl: './three-dots-menu.component.html',
  styleUrls: ['./three-dots-menu.component.scss'],
  animations: [
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' })),
      ]),
    ]),
  ],
})
export class ThreeDotsMenuComponent implements OnInit {
  isMenu = false;
  ngOnInit(): void {
    console.log(this.threeDotsMenu, 'threedotws');
  }
  @Input() threeDotsMenu: ThreedotsMenu[] = [];
  @Input() dropdownLabel: string = "Base Scenario";
  @Input() customerData: any;
  @Input() index: any;
  @Input() dropdownOptions: any;

  @Output() dropDownClicked = new EventEmitter();
  constructor(public commonService: CommonService) {}


  
  toggleMenu() {
    this.isMenu = !this.isMenu;
  }
  getChangeValue(value: any) {
    this.dropDownClicked.emit(value?.scenarioHeader);
    this.dropdownLabel = value?.name;
  }
}
