import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-generic-popup-component',
  templateUrl: './generic-popup-component.component.html',
  styleUrls: ['./generic-popup-component.component.scss']
})
export class GenericPopupComponentComponent {
  @Output() isClose = new EventEmitter();
  @Output() isAdded = new EventEmitter();

  @Input() message:string = ''
  @Input() description:string = ''
  @Input() yes:string = ''
  @Input() no:string = ''
  @Input() type:string = ''

  constructor( public _commonService:CommonService){

  }


  close() {
    this.isClose.emit(true);
  }
  closePopUp() {
    this.isAdded.emit(true);
  }

}
