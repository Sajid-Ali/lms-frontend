import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

    isEnrolledSelect;
    isMyCourseSelect;
    urlSegemnt;
    sec;

    constructor(private router: Router) {
    }

    ngOnInit() {

        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        if (s[2]) {
            this.urlSegemnt = s[2].path;
            this.isMyCourseSelect = this.urlSegemnt === 'mycourse';
            this.isEnrolledSelect = this.urlSegemnt === 'enroll';
            this.sec = this.urlSegemnt;
        } else {
            this.isMyCourseSelect = true;
            this.isEnrolledSelect = false;
        }


    }

    ngDoCheck() {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        if (s[2]) {
            this.urlSegemnt = s[2].path;
            this.isMyCourseSelect = this.urlSegemnt === 'mycourse';
            this.isEnrolledSelect = this.urlSegemnt === 'enroll';
            this.sec = this.urlSegemnt;
        } else {
            this.isMyCourseSelect = true;
            this.isEnrolledSelect = false;
        }
    }

}
