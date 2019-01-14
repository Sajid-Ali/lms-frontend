import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IsUserService {

    constructor(private tokenService: TokenService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.tokenService.getUserTokenHandler().role === 'user') {
            return true;
        }

        this.router.navigateByUrl('/admin');
        window.scrollTo(0, 0);

    }
}
