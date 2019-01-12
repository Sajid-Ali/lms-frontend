import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, DoCheck,

    ElementRef,
    Input,

    OnInit,

    ViewChild
} from '@angular/core';
import {ActivatedRoute, ActivationEnd, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {RequestHandlerService} from 'src/app/Services/request-handler.service';
import * as $ from "jquery";
import uploadcare from 'uploadcare-widget';


@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent implements OnInit, DoCheck {

    @ViewChild('modalCloseBtn') videoUploadModal: ElementRef;
     courseId;
     courseDetails = {
        name: null,
        source: null
    };
    public course;
     uploadedVideo;
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
    public uriSegment;
    widget;
    constructor(
        private activatedRoute: ActivatedRoute,
        private requestHandler: RequestHandlerService,
        private ref: ChangeDetectorRef,
        private router: Router
    ) {
    }


    ngOnInit() {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        if (s[5] !== undefined) {
            this.uriSegment = s[5].path;
        } else {
            this.uriSegment = 'videos';
        }


        console.log(this.uriSegment);
        this.courseId = this.activatedRoute.snapshot.params['id'];
        this.requestHandler.getThisCourse(this.courseId).subscribe(
            data => this.course = data,
            error => console.log(error.error.error)
        );

    }

    ngDoCheck() {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        if (s[5] !== undefined) {
            this.uriSegment = s[5].path;
        } else {
            this.uriSegment = 'videos';
        }
    }

}
