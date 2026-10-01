import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-company-admin-course-details',
  templateUrl: './company-admin-course-details.component.html',
  styleUrls: ['./company-admin-course-details.component.scss']
})
export class CompanyAdminCourseDetailsComponent implements OnInit{

  constructor(
    public _commonService: CommonService,
    private _router:Router,
    private _location:Location
  ){}

  ngOnInit(): void {

  }
  availableCoursesArray=[
    {
      category:"sd",
      tittle:'zczc',
      description:'dazczczcz',
      availableTill:'asdfa'
    }
   
  ]

  navToBack(){
    this._location.back();
  }

}
