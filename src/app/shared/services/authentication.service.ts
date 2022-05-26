import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { BaseService } from './base.service'
import { map } from 'rxjs/operators'
import { User } from '@ba-shared/models/user.model'
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService<User> {
  private currentUser$: Observable<User>
  public currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
    null || {}
  )

  constructor(
    public httpClient: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {
    super(httpClient, baseUrl + '/users/authenticate')
    this.currentUser$ = this.currentUserSubject.asObservable()
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value
  }

  public login(email: string, password: string): Observable<User | null> {
    return this.post({ email, password }).pipe(
      map((user: User) => {
        // login success if there's a token in response
        if (user && user.token) {
          // store user details to local storage to keep logged user in between page refresh
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
          return user
        }
        return null
      })
    )
  }

  public logout(): void {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null || {})
  }
}
