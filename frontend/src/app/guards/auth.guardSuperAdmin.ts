import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models';
import RoleEnum = User.RoleEnum;

@Injectable()
export class AuthGuardSuperAdmin implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (localStorage.getItem('currentUser')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const role = currentUser.role;
      console.log(role);
      if (role === RoleEnum.superAdmin) {
        return true;
      } else {
        // not logged in so redirect to login page with the return url
        //this.logout();
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    }
  }

  logout(): any {
    // remove user from local storage to log user out
    this.authenticationService.logout();
  }
}
