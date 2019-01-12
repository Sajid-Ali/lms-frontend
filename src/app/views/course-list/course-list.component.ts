import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {RequestHandlerService} from 'src/app/Services/request-handler.service';
import {Router} from '@angular/router';
import {isEmpty} from 'rxjs/operators';
import {TokenService} from '../../Services/token.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, DoCheck {

     courses;
     isLoading;
    @Input() private categoryCourses;

    constructor(
        private requestHandler: RequestHandlerService,
        private router: Router,
        private tokenHandler: TokenService
    ) {
        this.isLoading = true;
        this.requestHandler.getAllCourses().subscribe(
            data => {
                this.courses = data;
                this.isLoading = false;
            },
            error => console.log(error.error.error)
        );
    }

    ngOnInit() {


        this.requestHandler.getAllCourses().subscribe(
            data => {
                this.courses = data;
                this.isLoading = false;
            },
            error => console.log(error.error.error)
        );
    }

    ngDoCheck() {
        this.courses = this.categoryCourses;
    }

    navigateToDetails(id, user_id) {
        if (this.tokenHandler.loggedIn()) {
            console.log(user_id === this.tokenHandler.getUserTokenHandler().id);
            if (user_id === this.tokenHandler.getUserTokenHandler().id) {
                this.router.navigateByUrl(`user/dashboard/course/details/${id}`);
                window.scrollTo(0, 0);

            } else {
                this.router.navigateByUrl(`course/${id}`);
                window.scrollTo(0, 0);
            }
        } else {
            console.log('not loggedin');
            this.router.navigateByUrl(`course/${id}`);
            window.scrollTo(0, 0);

        }


    }

}
