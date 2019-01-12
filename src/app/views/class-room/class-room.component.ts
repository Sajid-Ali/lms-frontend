import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestHandlerService} from 'src/app/Services/request-handler.service';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../Services/token.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-class-room',
    templateUrl: './class-room.component.html',
    styleUrls: ['./class-room.component.css']
})
export class ClassRoomComponent implements OnInit {

    @ViewChild('reviewModalCloseBtn') modalCloseBtn: ElementRef;
    closeBtn;
    courseId;
    course;
    courseVideos;
    source;
    public currentPlaying;
    mouseHoverOnLike;
    mouseHoverOnDontLike;
    liked;
    unliked;
    courseReview;

    course_ratting_review = {
        id: null,
        like_status_id: null,
        course_id: null,
        user_id: null,
        review: null
    };

    constructor(
        private requestHandler: RequestHandlerService,
        private activatedRoute: ActivatedRoute,
        private tokenHandler: TokenService
    ) {
        this.courseId = this.activatedRoute.snapshot.params['id'];
        this.requestHandler.getThisCourse(this.courseId).subscribe(
            data => this.course = data
        );
        this.course_ratting_review.course_id = this.courseId;
        this.course_ratting_review.user_id = this.tokenHandler.getUserTokenHandler().id;
        this.mouseHoverOnLike = false;
        this.liked = false;
        this.unliked = false;
        this.mouseHoverOnDontLike = false;
    }

    ngOnInit() {

        this.requestHandler.getVideosFromApi(this.courseId).subscribe(
            data => this.setValues(data)
        );

        this.requestHandler.getCourseReview(this.course_ratting_review).subscribe(
            review => {
                console.log(review);
                console.log('review[0]', review[0]);
                this.course_ratting_review = review[0];
                this.courseReview = review[0];
            }
        );


    }

    onSubmit(reviewForm: NgForm) {
        this.requestHandler.setCourseReview(this.course_ratting_review).subscribe(
            review => console.log(review)
        );
        this.closeBtn = this.modalCloseBtn.nativeElement;
        reviewForm.resetForm();

        this.closeBtn.click();
    }

    setValues(data) {
        this.courseVideos = data;
        this.source = data[0].cdnUrl;
        this.currentPlaying = data[0].id;
    }

    changeSource(source, id) {
        this.source = source;
        this.currentPlaying = id;
    }

    onMouseHoverOnLike() {
        this.mouseHoverOnLike = true;
        console.log('mouse Enter');
    }

    onMouseHoverDontLike() {
        this.mouseHoverOnDontLike = true;
    }

    onMouseLeave() {
        this.mouseHoverOnLike = false;
        this.mouseHoverOnDontLike = false;
        console.log('mouse leave');
    }


    onLikePressed() {
        this.liked = true;
        this.unliked = false;
        this.course_ratting_review.like_status_id = 1;
    }

    onUnlikePressed() {
        this.liked = false;
        this.unliked = true;
        this.course_ratting_review.like_status_id = 2;
    }

    onModalOpened() {
        if (this.courseReview) {
            console.log('course review hai');
            if (this.courseReview.like_status_id === 1) {
                this.liked = true;
            } else {
                console.log('review status :', this.course_ratting_review);
                this.unliked = true;
            }
        }
    }

}
