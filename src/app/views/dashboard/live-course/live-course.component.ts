import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestHandlerService} from '../../../Services/request-handler.service';
import {TokenService} from '../../../Services/token.service';


@Component({
    selector: 'app-live-course',
    templateUrl: './live-course.component.html',
    styleUrls: ['./live-course.component.css']
})
export class LiveCourseComponent implements OnInit, OnDestroy {

    constraints;
    canvas;

    apiKey = '46243812';
    sessionId;
    token;
    session;
    publisher;
    gotToken;
    started: Boolean;
    connected: Boolean;
    courseId;

    constructor(
        private requestHandler: RequestHandlerService,
        private tokenHandler: TokenService,
        private activatedRouter: ActivatedRoute) {

        this.constraints = {
            video: true
        };
        this.courseId = this.activatedRouter.snapshot.params['id'];
    }

    ngOnInit() {
        this.started = false;
        this.gotToken = true;
        this.requestHandler.goLive(this.courseId).subscribe(
            data => {
                Object.values(data).map((value, index) => {
                    if (index === 0) {
                        this.sessionId = value;
                    } else {
                        this.token = value;
                    }
                });
                console.log('Session id: ', this.sessionId);
                console.log('token: ', this.token);
                this.initializeSession();
            }
        );

    }

    // Handling all of our errors here by alerting them
    handleError(error) {
        if (error) {
            this.started = false;
            alert(error.message);
        }
    }

    initializeSession() {
        this.session = OT.initSession(this.apiKey, this.sessionId);

        // Subscribe to a newly created stream
        this.session.on('streamCreated', (event) => {
            this.session.subscribe(event.stream, 'subscriber', {
                insertMode: 'append',
                width: '15rem',
                height: '15rem'
            }, this.handleError);
        });
        // Create a publisher
        this.publisher = OT.initPublisher('publisher', {
            insertMode: 'append',
            width: '30rem',
            height: '30rem'
        }, this.handleError);


    }

    ngOnDestroy(): void {
        console.log('component destroy');

        this.session.disconnect();
    }

    start() {
        // Connect to the session

        this.session.connect(this.token, (error) => {

            // If the connection is successful, publish to the session
            if (error) {
                this.handleError(error);
            } else {
                this.session.publish(this.publisher, this.handleError);
            }
        });

        this.started = true;

    }

    end() {
        this.started = false;
        this.session.unpublish(this.publisher, this.handleError);
        this.ngOnInit();
    }


}
