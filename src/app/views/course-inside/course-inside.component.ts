import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    DoCheck,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {RequestHandlerService} from 'src/app/Services/request-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from 'src/app/Services/token.service';
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';

@Component({
    selector: 'app-course-inside',
    templateUrl: './course-inside.component.html',
    styleUrls: ['./course-inside.component.css']
})
export class CourseInsideComponent implements OnInit, AfterViewInit {

    courseId;
    course;
    preview;
    courseVideos: any;
    userId;
    course_user;
    public isEnrolled: Boolean = false;
    modules;
    isLoggedIn: Boolean = false;
    isLoading: Boolean = false;
    hasApiResponse: Boolean = true;
    @ViewChild('modalCloseBtn') videoUploadModal: ElementRef;
    @ViewChild('ContentHeader') cardHeader: ElementRef;

    @ViewChild('cardInfo') cardInfo: ElementRef;
    card: any;
    cardHandler = this.onChange.bind(this);
    error: string;

    courseInfo;
    courseReviews;

    constructor(
        private requestHandler: RequestHandlerService,
        private activatedRoute: ActivatedRoute,
        private tokenHandler: TokenService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {
        this.preview = null;
    }


    ngOnInit() {

        this.isLoggedIn = this.tokenHandler.loggedIn();
        console.log(this.isLoggedIn);

        this.courseId = this.activatedRoute.snapshot.params['id'];
        this.requestHandler.getThisCourse(this.courseId).subscribe(
            data => {
                this.course = data;
            });

        this.requestHandler.getCourseUser(this.courseId).subscribe(
            user => {
                this.course_user = user;
                console.log(user);
            });

        this.requestHandler.getCourseInfo(this.courseId).subscribe(
            courseInfo => this.courseInfo = courseInfo
        );

        this.requestHandler.getCourseModules(this.courseId).subscribe(
            data => this.setModules(data)
        );
        this.requestHandler.getVideosFromApi(this.courseId).subscribe(
            data => this.courseVideos = data
        );
        this.requestHandler.getAllReviews(this.courseId).subscribe(
            reviews => {
                this.courseReviews = reviews;
                console.log(reviews);
            }
        );

        if (this.isLoggedIn) {
            this.userId = this.tokenHandler.getUserTokenHandler().id;
            this.requestHandler.isCourseEnrolled(this.courseId, this.userId).subscribe(
                data => {
                    this.isEnrolled = Object.keys(data).length !== 0;
                }
            );
        }

    }

    ngAfterViewInit(): void {
        this.card = elements.create('card');
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);


    }

    setModules(data) {
        this.modules = data;
    }

    // ngOnDestroy() {
    //     this.card.removeEventListener('change', this.cardHandler);
    //     this.card.destroy();
    // }

    onChange({error}) {

        if (error) {
            this.error = error.message;
        } else {
            this.error = null;
        }
        this.cd.detectChanges();
    }

    async onSubmit(form: NgForm) {
        this.isLoading = true;
        const {token, error} = await stripe.createToken(this.card);

        if (error) {
            this.isLoading = false;
            console.log('Something is wrong:', error);
        } else {

            console.log('Success!', token);
            const data = {
                token: token.id,
                price: this.course.price,
                user_id: this.userId,
                course_id: this.courseId,
                owner_id: this.course.user_id
            };

            this.requestHandler.buyCourse(data).subscribe(
                course => {
                    this.isLoading = false;
                    console.log(course);
                    this.hasApiResponse = true;
                    this.isEnrolled = course ? true : false;
                    const modal = this.videoUploadModal.nativeElement;
                    modal.click();
                }
            );
        }


        form.resetForm();
    }

    toggleCourse(event: MouseEvent, id) {
        console.log(event.srcElement.nextSibling);
        const cardBody = event.srcElement.nextSibling;
        $(cardBody).toggle(500);
        const span = $('#span_' + id);
        if (span.text() === '-') {
            span.text('+');
        } else {
            span.text('-');
        }
    }

    buyNow() {
        if (!this.isLoggedIn) {
            this.router.navigateByUrl('register');
            window.scrollTo(0, 0);
        }
    }

    goToClass() {
        this.router.navigateByUrl(`user/classroom/${this.courseId}`);
        window.scrollTo(0, 0);
    }

    goToLiveRoom() {
        this.router.navigateByUrl(`user/classroom/live/${this.courseId}`);
        window.scrollTo(0, 0);
    }

    closeModal() {
        this.preview = null;
    }

    openModal() {
        this.preview = this.courseVideos[0].cdnUrl;
    }

    getFormattedDuration(secs) {
        let minutes = Math.floor(secs / 60);
        secs = Math.floor(secs % 60);
        const hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        // return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
        return `${hours}:${minutes}:${secs}`;
    }

}

