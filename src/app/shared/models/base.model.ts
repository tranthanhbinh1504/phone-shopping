import { Observable } from 'rxjs'
import { JWT } from './auth.model'

export interface BaseResponse<T> {
  data: T
  jwt?: JWT
  message: string
  statusCode: number
  success: boolean
}

export interface Pagination {
  size: number
  page: number
}

export interface CrudOperation<T> {
  getAll(pagination?: Pagination): Observable<BaseResponse<T>>
  getOne(id: string | number): Observable<BaseResponse<T>>
  post(body: any, options: any): Observable<BaseResponse<T>>
  put(id: string | number, body: any): Observable<BaseResponse<T>>
  delete(id: string | number): Observable<boolean>
}
