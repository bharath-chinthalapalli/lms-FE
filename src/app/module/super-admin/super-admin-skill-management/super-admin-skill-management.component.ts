import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';
import { SuperAdminService } from '../super-admin.service';
import { SuperAdminSkillsDto } from 'src/app/shared/model/super-admin/super-admin-skills-Dto';
import { RequestDto } from 'src/app/shared/model/requesDto';

@Component({
  selector: 'app-super-admin-skill-management',
  templateUrl: './super-admin-skill-management.component.html',
  styleUrls: ['./super-admin-skill-management.component.scss'],
})
export class SuperAdminSkillManagementComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  skillManagementArray: SuperAdminSkillsDto[] = [];
  requestDto : RequestDto = new RequestDto();
  addSkilForm!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private _service:SuperAdminService
  ) {}

  skillManagementTableHeader: string[] = [
    'S.No',
    'Skill Name',
    'Users Enrolled',
    'Added on',
  ];

  ngOnInit(): void {
    this.requestDto.pageNumber = this.currentPage;
    this.requestDto.pageSize = this.pageSize;
    this.getSkillManagementData();
  }

  addSkillFormInitailzed() {
    this.addSkilForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getSkillManagementData() {
    // this.apiService
    //   .getService(
    //     this.apiService.LMS_API_URL.skill_management_process_url + 'all'
    //   )
    //   .subscribe({
    //     next: (res: any) => {
    //       this.skillManagementArray = res?.data;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });

    this._service.getSkilsDetails(this.requestDto).subscribe({
      next:(response:any)=>{
        this.skillManagementArray  = response.data.content;
      }
    })
  }

  addSkillPopup() {
    this.addSkillFormInitailzed();
    this.commonService.openPopuop(
      this.loadPopup,
      this.commonService.TextEnums.SUPER_ADMIN_SKILL_MANAGEMENT,
      this.commonService.TextEnums.CLOSE_TEXT,
      this.commonService.TextEnums.ADD_TEXT,
      this.addSkilForm,
      'Add Skill',
      this.addSkill.bind(this)
    );
  }

  addSkill() {
    // const url = `${
    //   this.apiService.LMS_API_URL.skill_management_process_url + 'add'
    // }`;
    // this.apiService.postService(url, this.addSkilForm.value).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.getSkillManagementData();
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    this._service.saveSkills(this.addSkilForm.value).subscribe({
      next:(response:any)=>{
        console.log(response.data);
        this.getSkillManagementData();
      }
    })
  }
}

export interface Addskill {
  name: string;
}
