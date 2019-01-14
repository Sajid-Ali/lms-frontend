import {Component, OnInit} from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';

@Component({
    selector: 'app-admin-courses',
    templateUrl: './admin-courses.component.html',
    styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

    courses;

    constructor(private requestHandler: RequestHandlerService) {
    }

    ngOnInit() {
        this.requestHandler.getAllCourses().subscribe(
            courses => {
                this.courses = courses;
                console.log('courses:', courses);
            }
        );
    }

}
