import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Pagination {
  limit: number
  offset: number
}

export abstract class BaseService<T> {
  constructor(protected httpClient: HttpClient, private actionUrl: string) {}

  getAll(pagination: Pagination): Observable<T[]> {
    return this.httpClient.get<T[]>(this.actionUrl, {
      params: {
        limit: pagination.limit,
        offset: pagination.offset,
      },
    })
  }

  getOne(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.actionUrl}/${id}`)
  }

  post(body: T): Observable<T> {
    return this.httpClient.post<T>(this.actionUrl, body)
  }

  put(id: string | number, body: T): Observable<T> {
    return this.httpClient.put<T>(`${this.actionUrl}/${id}`, body)
  }

  delete(id: string | number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.actionUrl}/${id}`)
  }
}
