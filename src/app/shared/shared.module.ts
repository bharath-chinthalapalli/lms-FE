import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { IdentifiedNegativeValuesPipe } from './pipes/identified-negative-values.pipe';
import { CurrencyCovertingPipe } from './pipes/currency-coverting.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderDirective } from './directives/appPlaceholder.directive';

import { CapitalizeSpacePipe } from './pipes/capitalize-space.pipe';
import { TooltipPipe } from './pipes/tooltip.pipe';
import { replaceHiphen } from './pipes/replace-hiphen.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeadingComponent } from './components/heading/heading.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardCourseComponent } from './components/card-course/card-course.component';
import { HeadingDescriptionComponent } from './components/heading-description/heading-description.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { GenericPopupComponentComponent } from './components/generic-popup-component/generic-popup-component.component';
import { BannerComponentComponent } from './components/banner-component/banner-component.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';
import { LmsTableComponent } from './components/lms-table/lms-table.component';
import { DashboardAppCardComponent } from './components/dashboard-app-card/dashboard-app-card.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { AddPopupsComponent } from './components/add-popups/add-popups.component';
import { ThreeDotsMenuComponent } from './components/three-dots-menu/three-dots-menu.component';
import { AddButtonIconComponent } from './components/add-button-icon/add-button-icon.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ToastrModule } from "ngx-toastr";
import { ChangePasswordComponent } from './components/popupForms/change-password/change-password.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SplitAndCapitalizePipe } from './pipes/capitalize-first-letter.pipe';
import { InviteUserComponent } from './components/popupForms/invite-user/invite-user.component';
import { CreateGroupComponent } from './components/popupForms/create-group/create-group.component';
import { AddUserComponent } from './components/popupForms/add-user/add-user.component';
import { AssignUserGroupComponent } from './components/popupForms/assign-user-group/assign-user-group.component';

@NgModule({
  declarations: [
    PlaceholderDirective,

    FooterComponent,
    IdentifiedNegativeValuesPipe,
    CurrencyCovertingPipe,
    CapitalizeSpacePipe,
    TooltipPipe,
    replaceHiphen,
    SidebarComponent,
    HeadingComponent,
    CardHeaderComponent,
    CardCourseComponent,
    HeadingDescriptionComponent,
    CardDetailComponent,
    GenericPopupComponentComponent,
    BannerComponentComponent,
    LmsTableComponent,
    DashboardAppCardComponent,
    ButtonIconComponent,
    AddPopupsComponent,
    ThreeDotsMenuComponent,
    AddButtonIconComponent,
    PaginatorComponent,
    ChangePasswordComponent,
    LoaderComponent,
    SplitAndCapitalizePipe,
    
    InviteUserComponent,
    CreateGroupComponent,
    AddUserComponent,
    AssignUserGroupComponent,

    

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AngularSvgIconModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [
    PlaceholderDirective,
    FooterComponent,
    IdentifiedNegativeValuesPipe,
    CurrencyCovertingPipe,
    TooltipPipe,
    replaceHiphen,
    HeadingComponent,
    CardHeaderComponent,
    CardCourseComponent,
    SidebarComponent,
    HeadingDescriptionComponent,
    CardDetailComponent,
    BannerComponentComponent,
    LmsTableComponent,
    DashboardAppCardComponent,
    ButtonIconComponent,
    ThreeDotsMenuComponent,
    AddButtonIconComponent,
    PaginatorComponent,
    FormsModule,
    LoaderComponent,
    SplitAndCapitalizePipe,
    
    
  ]
})
export class SharedModule {}
