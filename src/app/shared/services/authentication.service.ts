import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { JWT } from '@ba-shared/models/auth.model'
import { User } from '@ba-shared/models/user.model'

import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser$: Observable<User>
  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUser') || '{}')
  )

  constructor(
    public httpClient: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    private dialog: MatDialog
  ) {
    this.currentUser$ = this.currentUserSubject.asObservable()
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  public setTokenAndRefreshToken(jwt: JWT): void {
    localStorage.setItem('token', jwt.token)
    localStorage.setItem('refreshToken', jwt.refreshToken)
  }

  public login(email: string, password: string): Observable<User | null> {
    const url = this.baseUrl + '/auth/login'
    return this.httpClient.post(url, { email, password }).pipe(
      map((res: any) => {
        if (res && res.success) {
          const { jwt, user } = res.data
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.setTokenAndRefreshToken(jwt)
          this.currentUserSubject.next(user)
          return user
        }
        return null
      })
    )
  }

  public register(body: any): Observable<User | null> {
    const url = this.baseUrl + '/auth/register'
    return this.httpClient.post(url, body).pipe(
      map((res: any) => {
        if (res && res.success) {
          const { user } = res.data
          return user
        }
        return null
      })
    )
  }

  public verifyToken(token: string): Observable<boolean> {
    const url = this.baseUrl + '/auth/register/verify'
    return this.httpClient.post(url, { token }).pipe(
      map((res: any) => {
        return res && res.success
      })
    )
  }

  public logout(): void {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    this.currentUserSubject.next(null)
  }
}
