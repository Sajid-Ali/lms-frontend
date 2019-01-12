import {ChangeDetectorRef, Component, DoCheck, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {RequestHandlerService} from '../../../Services/request-handler.service';
import {TokenService} from '../../../Services/token.service';
import {Router} from '@angular/router';
import {ObserverService} from '../../../Services/observer.service';
import * as $ from 'jquery';
import {NgForm} from '@angular/forms';
import uploadcare from 'uploadcare-widget';


@Component({
    selector: 'app-my-course',
    templateUrl: './my-course.component.html',
    styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

    courseId;
    createdCourse;
    isUploadComplete;
    public data = {
        course_name: null,
        description: null,
        price: null,
        category_id: null,
        isPublished: false,
        user_id: null,
        image_cdnUrl: null,
        course_type_id: null
    };

    courses;
    hover;
    @ViewChild('createCourseModal') createCourseModal: ElementRef;
    @ViewChild('uploadCareWidget') uploadCareWidget: ElementRef;
    modal: any;
    widget;

    constructor(
        private requestHandler: RequestHandlerService,
        private tokenHandler: TokenService,
        private router: Router,
        private observer: ObserverService,
        private cd: ChangeDetectorRef
    ) {
        this.hover = false;
        this.isUploadComplete = false;
    }

    // ngDoCheck() {
    //     const widget = uploadcare.Widget($('#file-uploader'));
    //     widget.onUploadComplete(function(info) {
    //         console.log(info);
    //     });
    // }


    ngOnInit() {
        this.widget = uploadcare.Widget($('#file-uploader'));
        this.widget.onUploadComplete((info) => {
            this.data.image_cdnUrl = info.cdnUrl;
        });


        this.isUploadComplete = false;
        this.requestHandler.getMyCourse(this.tokenHandler.getUserTokenHandler().id)
            .subscribe(
                data => this.setCourse(data)
            );
    }

    setCourse(data) {
        this.observer.getMyCourse(data);
        this.observer.mycourse.subscribe(value =>
            this.courses = value
        );
    }

    getUserId() {
        return this.tokenHandler.getUserTokenHandler().id;
    }

    onSubmit(form: NgForm) {
        this.data.user_id = this.getUserId();
        this.requestHandler.createCourse(this.data).subscribe(
            data => this.observer.changeMyCourse(data),
            error => console.log(error)
        );
        // this.requestHandler.getMyCourse(this.getUserId()).subscribe(
        //     data => {this.observer.changeMyCourse(data)}
        // );

        this.modal = this.createCourseModal.nativeElement;
        this.modal.click();
        form.resetForm();
        this.widget.value(null);
        // this.observer.mycourse.subscribe(
        //     // data => this.router.navigateByUrl(`/user/dashboard/course/details/${data.id}/info/${data.id}`)
        //     data => console.log('this is data from observer mycourse', data)
        // );

    }


    // onUploadComplete(event) {
    //     console.log(event);
    //     console.log(event.cdnUrl);
    //     this.data.image_cdnUrl = event.cdnUrl;
    // }

}
