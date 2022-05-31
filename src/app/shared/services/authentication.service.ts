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
  private defaultURL = 'http://localhost:3000'

  private currentUser$: Observable<User>
  public currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('jwt')!)
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

  public login(username: string, password: string): Observable<User | null> {
    // case 1 :

    // return this.post({ email, password }).pipe(
    //   map((user: User) => {
    //     // login success if there's a token in response
    //     if (user && user.token) {
    //       // store user details to local storage to keep logged user in between page refresh
    //       localStorage.setItem('currentUser', JSON.stringify(user))
    //       this.currentUserSubject.next(user)
    //       return user
    //     }
    //     return null
    //   })
    // )

    // case 2 :
    const url = this.defaultURL + '/auth/login'
    return this.httpClient.post(url, { username, password }).pipe(
      map((res: any) => {
        if (res) {
          const { jwt } = res
          localStorage.setItem('jwt', JSON.stringify(jwt))
          this.currentUserSubject.next(jwt)
          return jwt
        }
        return null
      })
    )
  }

  public logout(): void {
    localStorage.removeItem('jwt')
    this.currentUserSubject.next(null || {})
  }
}
