import {ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ObserverService} from '../../Services/observer.service';
import {TokenService} from '../../Services/token.service';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {Router, RouterEvent} from '@angular/router';
import {NgModel} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {e} from '@angular/core/src/render3';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, DoCheck, OnChanges {

    @ViewChild('filterInput') filterInput: NgModel;
    @Input() loggedIn: Boolean;
    public authUser;
    @Input() balance;
    searchTerm;
    searchResults;

    constructor(
        private observer: ObserverService,
        private tokenService: TokenService,
        private requestHandlerService: RequestHandlerService,
        private router: Router
    ) {
        console.log('loggedIn: ', this.observer.authStatus);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    ngOnInit() {

        // this.requestHandlerService.getUserAccount(this.tokenService.getUserTokenHandler().id).subscribe(
        //     data => {
        //         this.initBalance(data);
        //     }
        // );
        this.filterInput.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(
            term => {
                if (term) {
                    this.search(term);
                } else {
                    this.searchResults = null;
                }
            }
        );


    }

    ngDoCheck() {
        if (this.tokenService.loggedIn()) {
            this.authUser = this.tokenService.getUserTokenHandler();
        }

    }

    search(term) {
        this.requestHandlerService.searchByTerm(term).subscribe(
            results => {
                console.log(results);
                this.searchResults = results;

            }
        );
    }

    navigateToDetails(id, user_id) {
        if (this.tokenService.loggedIn()) {
            console.log(user_id === this.tokenService.getUserTokenHandler().id);
            if (user_id === this.tokenService.getUserTokenHandler().id) {
                this.router.navigateByUrl(`user/dashboard/course/details/${id}`);
                window.location.reload();
                window.scrollTo(0, 0);

            } else {
                console.log('is loggedIn');
                this.router.navigateByUrl(`course/${id}`);
                window.location.reload();
                window.scrollTo(0, 0);
            }
        } else {
            console.log('not loggedin');
            this.router.navigateByUrl(`course/${id}`);
            window.scrollTo(0, 0);

        }
        this.searchResults = null;

    }

    logOut(event: MouseEvent) {
        event.preventDefault();
        this.tokenService.remove();
        this.observer.changeAuthStatus(false);
        this.router.navigateByUrl('/');
    }

    handleRequest(data) {
        this.tokenService.remove();
        this.observer.changeAuthStatus(false);
        this.router.navigateByUrl('/');
    }


}
