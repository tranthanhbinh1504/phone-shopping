import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { AuthenticationService } from '@ba-shared/services/authentication.service'
import { Observable } from 'rxjs'

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    @Inject('BASE_URL') private baseURL: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.getCurrentUser()
    const token = this.authenticationService.getToken()
    const refreshToken = this.authenticationService.getRefreshToken()
    const isLoggedIn = currentUser && token
    const isAPIURL = req.url.startsWith(this.baseURL)
    if (isLoggedIn && isAPIURL) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // refreshtoken: refreshToken,
        },
      })
    }
    return next.handle(req)
  }
}
