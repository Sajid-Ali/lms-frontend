import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-gig-list',
    templateUrl: './gig-list.component.html',
    styleUrls: ['./gig-list.component.css']
})
export class GigListComponent implements OnInit, DoCheck {

    gigs;

    @Input() private categoryGigs;
    public isLoading;

    constructor(
        private requestHandler: RequestHandlerService,
        private router: Router
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.requestHandler.getAllGigs().subscribe(
            data => {
                this.gigs = data;
                this.isLoading = false;
            },
            error => console.log(error.error.error)
        );

    }

    ngDoCheck() {

        this.gigs = this.categoryGigs;
    }

    navigateToGigDetails(id) {
        this.router.navigateByUrl(`gig/${id}`);
    }

}
