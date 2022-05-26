import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { User } from '@ba-shared/models/user.model'
import { AuthenticationService } from '@ba-shared/services/authentication.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  private getCurrentUser(): User {
    return this.authenticationService.getCurrentUser()
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.getCurrentUser()) {
      // authotized
      return true
    }
    // unauthorized
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false
  }

  // no need to check role
  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //     // check if route is restricted by role
  //     if(this.getCurrentUser() && childRoute.data.roles && childRoute.data.roles.indexOf(this.getCurrentUser().role) === -1) {
  //         this.router.navigate(['/web/admin'])
  //         return false;
  //     }
  //     return true;
  // }
}
