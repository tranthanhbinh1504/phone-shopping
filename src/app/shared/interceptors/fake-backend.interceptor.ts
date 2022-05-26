import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators'
import { ROLE } from '../constants'
import { User } from '../models/user.model'

const users: User[] = [
  {
    id: '90d03cda-4786-46f9-ab75-6dab7ee7317b',
    email: 'admin@gmail.com',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: ROLE.ADMIN,
  },
  {
    id: '4c029d06-6a08-48c4-b7c8-065bbc16cc80',
    email: 'user@gmail.com',
    password: 'user',
    firstName: 'Normal',
    lastName: 'User',
    role: ROLE.USER,
  },
]

@Injectable()
export class FakeBEInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(delay(500))
      .pipe(dematerialize())

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate()
        case url.endsWith('/users') && method === 'GET':
          return getUsers()
        default:
          return next.handle(req)
      }
    }

    function authenticate() {
      const { username, password } = body
      const user = users.find(
        (user) => user.username === username && user.password === password
      )
      if (!user) return error('Username or Password is incorrect')
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`,
      })
    }

    function getUsers() {
      if (!isAdmin()) return unauthorized()
      return ok(users)
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
      return throwError({ status: 400, error: { message } })
    }

    function unauthorized() {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      })
    }

    function isLoggedIn() {
      // const authHeader = headers.get('Authorization') || ''
      // return authHeader.startsWith('Bearer fake-jwt-token')
      return null
    }

    function getCurrentUser() {
      // if (!isLoggedIn()) return
      // const id = headers.get('Authorization').split('.')[1]
      // return users.find((x) => x.id === id)
      return null
    }

    function isAdmin() {
      // return isLoggedIn() && getCurrentUser().role === ROLE.ADMIN
      return null
    }
  }
}
