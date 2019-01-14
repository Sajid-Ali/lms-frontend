import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {TokenService} from './token.service';
import {RequestHandlerService} from './request-handler.service';
import {isNumber} from 'util';

@Injectable({
    providedIn: 'root'
})

export class ObserverService {

    private loggedIn = new BehaviorSubject<Boolean>(this.tokenService.loggedIn());
    public balance = new BehaviorSubject(0);
    public mycourse;
    public courseVideos;

    authStatus = this.loggedIn.asObservable();
    balanceStatus = this.balance.asObservable();

    constructor(private tokenService: TokenService, private requestHandler: RequestHandlerService) {

    }

    changeBalance(balance) {
        this.balance.next(balance);
    }

    changeAuthStatus(value: Boolean) {
        this.loggedIn.next(value);
    }

    getMyCourse(data) {
        this.mycourse = new BehaviorSubject(data);
    }

    getCourseVideos(data) {
        this.courseVideos = new BehaviorSubject(data);
    }

    changeMyCourse(data) {
        this.mycourse.next(data);
    }

    changeCourseVideos(data) {
        this.courseVideos.next(data);
    }


}
