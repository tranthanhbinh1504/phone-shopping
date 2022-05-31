import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private defaultURL = 'http://localhost:3000'

  constructor(public httpClient: HttpClient) {}

  public getListItems(): Observable<any> {
    return this.httpClient.get(this.defaultURL + '/item/').pipe(
      map((res: any) => {
        if (res) {
          return res
        }
        return null
      })
    )
  }
}
