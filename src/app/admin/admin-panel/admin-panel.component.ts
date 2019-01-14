import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, PRIMARY_OUTLET, Route, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, DoCheck {

    path;

    constructor(private router: Router) {
    }

    ngOnInit() {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        this.path = s[1].path;
        console.log('URI', this.path);

    }

    onClickMenuItem(menuItem) {
        // console.log('URI:on click is working');
        // const tree: UrlTree = this.router.parseUrl(this.router.url);
        // const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        // const s: UrlSegment[] = g.segments;
        // this.path = s[1].path;
        // console.log('URI', this.path);
    }

    ngDoCheck() {
        console.log('URI:on click is working');
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        if (s[1] !== undefined) {
            this.path = s[1].path;
        } else {
            this.path = s[0].path;
        }

        console.log('URI', this.path);
    }

}
