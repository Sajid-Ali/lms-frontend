import {NgModule} from '@angular/core';
import {Routes, RouterModule, ChildrenOutletContexts, OutletContext} from '@angular/router';
import {ContentComponent} from './views/content/content.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {DashboardComponent} from './views/dashboard/dashboard/dashboard.component';
import {MyCourseComponent} from './views/dashboard/my-course/my-course.component';
import {CourseEnrollComponent} from './views/dashboard/course-enroll/course-enroll.component';
import {CourseDetailComponent} from './views/course-detail/course-detail.component';
import {CourseInsideComponent} from './views/course-inside/course-inside.component';
import {ClassRoomComponent} from './views/class-room/class-room.component';
import {AfterLoginService} from './Services/after-login.service';
import {BeforeLoginService} from './Services/before-login.service';
import {GigComponent} from './views/gig/gig.component';
import {GigDetailComponent} from './views/gig-detail/gig-detail.component';
import {SettingComponent} from './views/setting/setting.component';
import {OrdersComponent} from './views/orders/orders.component';
import {YourOrdersComponent} from './views/your-orders/your-orders.component';
import {OrdersfromyouComponent} from './views/ordersfromyou/ordersfromyou.component';
import {CoursevideosComponent} from './views/courseDetails/coursevideos/coursevideos.component';
import {CourseInfoComponent} from './views/courseDetails/course-info/course-info.component';
import {ResetpasswordComponent} from './views/password/resetpassword/resetpassword.component';
import {ResponseResetPasswordComponent} from './views/password/response-reset-password/response-reset-password.component';
import {LiveCourseComponent} from './views/dashboard/live-course/live-course.component';
import {UserprofileComponent} from './views/user-profile/userprofile/userprofile.component';
import {ProfilepictureComponent} from './views/user-profile/profilepicture/profilepicture.component';
import {ProfileComponent} from './views/user-profile/profile/profile.component';
import {LiveEnrollCourseComponent} from './views/live-enroll-course/live-enroll-course.component';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {AdminRegisteredUsersComponent} from './admin/admin-registered-users/admin-registered-users.component';
import {AdminCoursesComponent} from './admin/admin-courses/admin-courses.component';
import {AdminCategoriesComponent} from './admin/admin-categories/admin-categories.component';
import {IsAdminService} from './Services/is-admin.service';
import {IsUserService} from './Services/is-user.service';

const routes: Routes = [

    {
        path: '',
        component: ContentComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [BeforeLoginService],
        children: [
            {
                path: 'reset-password',
                redirectTo: '/login/password/reset-password'
            }
        ]
    },
    {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AfterLoginService, IsAdminService],
        children: [
            {
                path: '',
                component: AdminRegisteredUsersComponent
            },
            {
                path: 'registered-users',
                component: AdminRegisteredUsersComponent
            },
            {
                path: 'courses',
                component: AdminCoursesComponent
            },
            {
                path: 'categories',
                component: AdminCategoriesComponent
            }
        ]
    },
    {
        path: 'login/password/reset-password',
        component: ResetpasswordComponent
    },
    {
        path: 'response-reset-password',
        component: ResponseResetPasswordComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [BeforeLoginService],
        children: [
            {
                path: 'login',
                redirectTo: '/login'
            }
        ]
    },
    {
        path: 'course/:id',
        component: CourseInsideComponent
    },
    {
        path: 'gig/:id',
        component: GigDetailComponent
    },
    {
        path: 'user/settings',
        component: SettingComponent,
        canActivate: [AfterLoginService]
    },
    {
        path: 'user/profile',
        component: UserprofileComponent,
        canActivate: [AfterLoginService],
        children: [
            {
                path: '',
                component: ProfileComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'profile_picture',
                component: ProfilepictureComponent
            }
        ]
    },
    {
        path: 'user/orders',
        component: OrdersComponent,
        canActivate: [AfterLoginService, IsUserService],
        children: [
            {
                path: '',
                component: YourOrdersComponent
            },
            {
                path: 'your_orders',
                component: YourOrdersComponent
            },
            {
                path: 'orders_from_you',
                component: OrdersfromyouComponent
            }
        ]
    },
    {
        path: 'user/dashboard',
        component: DashboardComponent,
        canActivate: [AfterLoginService, IsUserService],
        children: [
            {
                path: '',
                component: MyCourseComponent,
            },
            {
                path: 'enroll',
                component: CourseEnrollComponent,
                children: [
                    {
                        path: 'classroom/:id',
                        redirectTo: '/user/classroom/:id'
                    }
                ]
            },
            {
                path: 'gigs',
                component: GigComponent
            },
            {
                path: 'mycourse',
                component: MyCourseComponent,
                children: [
                    {
                        path: 'details/:id',
                        redirectTo: '/user/dashboard/course/details/:id'
                    }
                ]

            },
            {
                path: 'details/:id',
                redirectTo: '/user/dashboard/course/details/:id'
            }

        ],
    },
    {
        path: 'user/dashboard/course/details/:id',
        component: CourseDetailComponent,
        canActivate: [AfterLoginService, IsUserService],
        children: [
            {
                path: '',
                component: CoursevideosComponent
            },
            {
                path: 'videos/:id',
                component: CoursevideosComponent
            },
            {
                path: 'info/:id',
                component: CourseInfoComponent
            },
            {
                path: 'live/:id',
                component: LiveCourseComponent
            }
        ]
    },
    {
        path: 'user/classroom/:id',
        component: ClassRoomComponent,
        canActivate: [AfterLoginService, IsUserService]
    },
    {
        path: 'user/classroom/live/:id',
        component: LiveEnrollCourseComponent,
        canActivate: [AfterLoginService, IsUserService]
    },
    {path: '**', component: ContentComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

