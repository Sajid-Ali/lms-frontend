import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestHandlerService} from 'src/app/Services/request-handler.service';
import * as $ from 'jquery';
import uploadcare from 'uploadcare-widget';
import {NgForm} from '@angular/forms';
import {fileUploads} from 'stripe';
import {UcWidgetComponent, UcWidgetCustomComponent} from 'ngx-uploadcare-widget';
import {TokenService} from '../../../Services/token.service';

@Component({
    selector: 'app-coursevideos',
    templateUrl: './coursevideos.component.html',
    styleUrls: ['./coursevideos.component.css']
})
export class CoursevideosComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('modalCloseBtn') videoUploadModal: ElementRef;
    @ViewChild(UcWidgetComponent) UCWidget: UcWidgetComponent;
    @ViewChild(UcWidgetCustomComponent) Custom_UCWidget: UcWidgetCustomComponent;

    private courseDetails = {
        name: null,
        source: null
    };
    public course;
    private uploadedVideo;
    videoData = {
        uuid: null,
        cdnUrl: null,
        title: null,
        description: null,
        course_id: null,
        duration: null,
        module: null,
        checked: false
    };
    @Input() public courseVideos;
    public courseId;
    public enrolledCourses;
    private widget;
    private videoPlayer;
    durationFetchingComplete = true;
    @Input() public modules;
    loading;

    constructor(
        private router: ActivatedRoute,
        private requestHandler: RequestHandlerService,
        private tokenHandler: TokenService,
        private ref: ChangeDetectorRef,
        private navigator: Router
    ) {
        setInterval(() => {
            this.ref.markForCheck();
        }, 1000);
    }

    ngOnInit() {
        this.loading = true;
        // if (!this.loading) {
        //     console.log('After loading complete in videoplayer');
        //     this.videoPlayer = document.getElementById('videoPlayer');
        //     this.widget = uploadcare.Widget($('#file-uploader'));
        //     console.log(this.widget);
        //
        //     this.widget.onUploadComplete((info) => {
        //         this.videoData.cdnUrl = info.cdnUrl;
        //         this.videoData.uuid = info.uuid;
        //         this.videoPlayer.setAttribute('src', this.videoData.cdnUrl);
        //         this.durationFetchingComplete = false;
        //     });
        //
        //     this.videoPlayer.onloadedmetadata = () => {
        //         console.log('duration: ', this.videoPlayer.duration);
        //         this.videoData.duration = this.videoPlayer.duration;
        //         this.durationFetchingComplete = true;
        //     };
        //
        // }


        this.courseId = this.router.snapshot.params['id'];
        this.requestHandler.getCourseModules(this.courseId).subscribe(
            data => this.setModules(data)
        );
        this.requestHandler.getVideosFromApi(this.courseId).subscribe(
            data =>
                this.setCourseVideos(data),
            error => console.log(error.error.error)
        );
        this.requestHandler.getEnrolledCourses(this.courseId).subscribe(
            data => this.enrolledCourses = data,
            error => console.log(error.error.error)
        );

        this.requestHandler.getThisCourse(this.courseId).subscribe(
            data => this.course = data,
            error => console.log(error.error.error)
        );

    }

    ngAfterViewInit(): void {
        console.log('******* widget ********', this.UCWidget);
        $('.cardContentBody').toggle();
    }

    setCourseVideos(data) {
        this.courseVideos = data;
        this.loading = false;
        console.log('loading in setCourseVideos:', this.loading);
        console.log(this.courseVideos);
    }

    onSubmit(form: NgForm) {

        this.videoData.course_id = this.courseId;
        // this.requestHandler.getCourseModules(this.courseId).subscribe(
        //     modules => this.setModules(modules)
        // );
        this.requestHandler.uploadCourseVideo(this.videoData).subscribe(
            data => {
                // this.courseVideos = data.videos;
                // this.modules = data.modules;
                Object.values(data).map((value, index) => {
                    if (index === 0) {
                        this.courseVideos = value;
                    } else {
                        this.modules = value;
                    }
                });
            },
            error => console.log(error.error.error)
        );

        const modal = this.videoUploadModal.nativeElement;
        modal.click();
        form.resetForm();

        this.UCWidget.clearUploads();
        setInterval(() => {
            this.ref.markForCheck();
        }, 1000);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('some changes here', changes);
    }

    setModules(data) {
        console.log('Modules:', data);
        this.modules = data;
    }

    setSource(event, src) {
        $('.active').removeClass('active');
        const element = event.srcElement;
        console.log($(element).addClass('active'));
        this.courseDetails.source = src;
    }

    toggleCourse(event: MouseEvent, id) {
        const cardBody = event.srcElement.nextSibling;
        $(cardBody).toggle(500);
        const span = $('#span_' + id);
        if (span.text() === '-') {
            span.text('+');
        } else {
            span.text('-');
        }
    }

    closeModal() {
        this.courseDetails.source = null;
    }

    isDurationFetched(): Boolean {
        return this.durationFetchingComplete;
    }

    isLoading(): Boolean {
        return this.videoData.module === null && this.videoData.duration === null
            && this.videoData.uuid === null && this.videoData.cdnUrl === null &&
            this.videoData.title === null && this.videoData.description === null;
    }

    getFormattedDuration(secs) {
        let minutes = Math.floor(secs / 60);
        secs = Math.floor(secs % 60);
        const hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        // return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
        return `${hours}:${minutes}:${secs}`;
    }

    onUploadComplete(info) {
        this.videoPlayer = document.getElementById('videoPlayer');
        this.videoData.cdnUrl = info.cdnUrl;
        this.videoData.uuid = info.uuid;
        this.videoPlayer.setAttribute('src', this.videoData.cdnUrl);
        this.durationFetchingComplete = false;

        this.videoPlayer.onloadedmetadata = () => {
            console.log('duration: ', this.videoPlayer.duration);
            this.videoData.duration = this.videoPlayer.duration;
            this.durationFetchingComplete = true;
        };


    }

    goLive() {
        this.navigator.navigateByUrl(`/user/dashboard/course/details/${this.courseId}/live/${this.courseId}`);
    }
}
