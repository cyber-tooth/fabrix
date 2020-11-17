import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {User} from "../models";
import RoleEnum = User.RoleEnum;

@Injectable()
export class AuthGuardUser implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (localStorage.getItem('currentUser')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const role = currentUser.role;
      if (role === RoleEnum.user ||  role === RoleEnum.admin ) {
        return true;
      } else {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    }

  }
}
