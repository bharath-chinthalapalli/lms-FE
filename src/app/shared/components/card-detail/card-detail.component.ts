import { Subscription } from 'rxjs';
import { PlaceholderDirective } from '../../directives/appPlaceholder.directive';
import { CommonService } from './../../../core/services/common.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GenericPopupComponentComponent } from '../generic-popup-component/generic-popup-component.component';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  private closeSubscription!: Subscription;
  openQuix: string = '';
  @Output() goToDashboard = new EventEmitter();

  @Input() cardDetailsById: any;

  constructor(public _commonService: CommonService) {}
  ngOnInit(): void {}

  quizArray: any[] = [
    {
      id: 1,
      question:
        'Parc Clematis Safety In-house Regulation for PPE are 以下那一类安全内部条例',
      option: [
        'Wear Safety Helmet 带上安全帽',
        'Equip Full body Harness 佩戴全身安全衣',
        'Wear Safety Helmet 带上安全帽',
        'Equip Full body Harness 佩戴全身安全衣',
      ],
    },
    {
      id: 2,
      question: 'Where can you smoke in the project ? 你可以在哪里吸烟? *',
      option: [
        'Wear Safety Helmet 带上安全帽',
        'Equip Full body Harness 佩戴全身安全衣',
        'Wear Safety Helmet 带上安全帽',
        'Equip Full body Harness 佩戴全身安全衣',
      ],
    },
    {
      id: 3,
      question:
        'What should you do when fire emergency event occur on site? 在工地发生火灾是你因该做啥？',
      option: [
        'Wear Safety Helmet 带上安全帽',
        'Equip Full body Harness 佩戴全身安全衣',
        'Wear Safety Helmet 带上安全帽',
        'Equip Full body Harness 佩戴全身安全衣',
      ],
    },
    {
      id: 5,
      question:
        'Which apps need to be download in your phone ? 哪一个电话程序必需下载在手机里?',
      option: [
        'Wear Safety Helmet 带上安全帽',
        'Equip Full body Harness 佩戴全身安全衣',
      ],
    },
  ];

  openAlertPopup() {
    const hostViewContainerRef = this.loadPopup.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      GenericPopupComponentComponent
    );
    componentRef.instance.message =
      'I confirm to have watched the full SIC video';
    componentRef.instance.description = 'Click on Yes to continue';
    componentRef.instance.yes = 'Yes';
    componentRef.instance.no = 'No';
    componentRef.instance.type = this._commonService.TextEnums.QUIZ_TEXT;
    this.closeSubscription = componentRef.instance.isClose.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
      this.openQuix = '';
    });
    this.closeSubscription = componentRef.instance.isAdded.subscribe(
      (el: any) => {
        this.openQuix = this._commonService.TextEnums.QUIZ_TEXT;
        this.closeSubscription.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
  openSuccessPopup() {
    const hostViewContainerRef = this.loadPopup.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      GenericPopupComponentComponent
    );
    componentRef.instance.type = 'Successful';
    this.closeSubscription = componentRef.instance.isClose.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
      this.openQuix = '';
    });
    this.closeSubscription = componentRef.instance.isAdded.subscribe(
      (el: any) => {
        this.goToDashboard.emit(true)
        this.closeSubscription.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  goBackToDashBoard(type:any) {
    if(type === this._commonService.TextEnums.SHOW_CARD_DETAILS){
      this.goToDashboard.emit(true)
    }else{
      this.openQuix = ''
    }
  }
}
