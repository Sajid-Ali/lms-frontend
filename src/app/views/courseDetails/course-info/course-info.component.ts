import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {RequestHandlerService} from '../../../Services/request-handler.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit, DoCheck {

    data: any = {
        id: null,
        wywl: '',
        description: '',
        courseId: '',
    };
    courseInfo;

    courseId;

    constructor(private requestHandler: RequestHandlerService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.courseId = this.activatedRoute.snapshot.params['id'];
        this.requestHandler.getCourseInfo(this.courseId).subscribe(
            courseInfo => {
                this.courseInfo = courseInfo;
                console.log(courseInfo);
            }
        );
    }

    submit() {
        this.data.courseId = this.courseId;
        this.requestHandler.setCourseInfo(this.data).subscribe(
            data => this.data = data
        );
    }

    ngDoCheck() {
        this.data = this.courseInfo;
    }


}
