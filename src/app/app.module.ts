import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { BannerComponent } from './layout/banner/banner.component';
import { ContentComponent } from './views/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CourseListComponent } from './views/course-list/course-list.component';
import { CourseDetailComponent } from './views/course-detail/course-detail.component';
import { ButtonComponent } from './utilityComponents/button/button.component';
import { CourseCardComponent } from './utilityComponents/course-card/course-card.component';
import { CategoryNavComponent } from './layout/category-nav/category-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './views/dashboard/sidebar/sidebar.component';
import { MainContentComponent } from './views/dashboard/main-content/main-content.component';
import { CourseEnrollComponent } from './views/dashboard/course-enroll/course-enroll.component';
import { MyCourseComponent } from './views/dashboard/my-course/my-course.component';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { CourseInsideComponent } from './views/course-inside/course-inside.component';
import { ClassRoomComponent } from './views/class-room/class-room.component';
import { GigComponent } from './views/gig/gig.component';
import { GigListComponent } from './views/gig-list/gig-list.component';
import { GigDetailComponent } from './views/gig-detail/gig-detail.component';
import { SettingComponent } from './views/setting/setting.component';
import { OrdersComponent } from './views/orders/orders.component';
import { YourOrdersComponent } from './views/your-orders/your-orders.component';
import { OrdersfromyouComponent } from './views/ordersfromyou/ordersfromyou.component';
import { CoursevideosComponent } from './views/courseDetails/coursevideos/coursevideos.component';
import { CourseInfoComponent } from './views/courseDetails/course-info/course-info.component';
import { CoursereviewsComponent } from './views/reviews/coursereviews/coursereviews.component';
import { ResetpasswordComponent } from './views/password/resetpassword/resetpassword.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { ResponseResetPasswordComponent } from './views/password/response-reset-password/response-reset-password.component';
import { LiveCourseComponent } from './views/dashboard/live-course/live-course.component';
import { LiveEnrollCourseComponent } from './views/live-enroll-course/live-enroll-course.component';
import { UserprofileComponent } from './views/user-profile/userprofile/userprofile.component';
import { ProfileComponent } from './views/user-profile/profile/profile.component';
import { ProfilepictureComponent } from './views/user-profile/profilepicture/profilepicture.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminRegisteredUsersComponent } from './admin/admin-registered-users/admin-registered-users.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CourseListComponent,
    CourseDetailComponent,
    ButtonComponent,
    CourseCardComponent,
    CategoryNavComponent,
    DashboardComponent,
    SidebarComponent,
    MainContentComponent,
    CourseEnrollComponent,
    MyCourseComponent,
    CourseInsideComponent,
    ClassRoomComponent,
    GigComponent,
    GigListComponent,
    GigDetailComponent,
    SettingComponent,
    OrdersComponent,
    YourOrdersComponent,
    OrdersfromyouComponent,
    CoursevideosComponent,
    CourseInfoComponent,
    CoursereviewsComponent,
    ResetpasswordComponent,
    ResponseResetPasswordComponent,
    LiveCourseComponent,
    LiveEnrollCourseComponent,
    UserprofileComponent,
    ProfileComponent,
    ProfilepictureComponent,
    AdminPanelComponent,
    AdminRegisteredUsersComponent,
    AdminCoursesComponent,
    AdminCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    UcWidgetModule,
    SnotifyModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
