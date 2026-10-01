import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonService } from "src/app/core/services/common.service";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit{

  constructor(
    public _commonService: CommonService
  ){}
  ngOnInit():void {}


  @Input() currentPage: any;
  @Input() totalPages: any;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  goToPage(pageNumber: number): void {
    if (pageNumber >= 0 && pageNumber < this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
  }
  // Number of page buttons to display at once
  numButtonsToShow = 5;
  // Array to hold the currently displayed page buttons
  displayedPageRange: number[] = [];
  getPageRange(): number[] {
    const displayedPageRange: number[] = [];
    let start = Math.max(
      0,
      this.currentPage - Math.floor(this.numButtonsToShow / 2)
    );
    let end = start + this.numButtonsToShow - 1;
    if (end >= this.totalPages) {
      start -= end - (this.totalPages - 1);
      end = this.totalPages - 1;
    }
    start = Math.max(0, start);
    for (let i = start; i <= end; i++) {
      displayedPageRange.push(i);
    }
    return displayedPageRange;
  }
}
