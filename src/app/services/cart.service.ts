import { BehaviorSubject, Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  listCart: any[] = []
  totalPrice: number = 0

  constructor() {}

  private checkExist(name: string) {
    const abc = this.listCart.find((o) => {
      if (o.product === name) {
        return true
      }
      return false
    })
    return abc
  }

  addtoCart(item: any) {
    this.listCart.find((o, i) => {
      if (o.product === item.name) {
        this.listCart[i] = {
          ...o,
          quantity: o.quantity + 1,
        }
      }
    })

    if (!this.checkExist(item.name)) {
      this.listCart.push({
        product: item.name,
        price: item.price,
        quantity: 1,
      })
    }

    if (this.listCart.length === 0) {
      this.listCart.push({
        product: item.name,
        price: item.price,
        quantity: 1,
      })
    }

    const totalPrice = this.listCart.forEach((o, i) => {
      this.totalPrice = this.totalPrice + parseInt(o.price) * o.quantity
    })
  }

  getListCart() {
    return this.listCart
  }

  getCartTotal() {
    if (this.listCart.length > 0) {
      this.listCart.forEach((o, i) => {
        this.totalPrice = this.totalPrice + parseInt(o.price) * o.quantity
      })
    }
    return this.totalPrice
  }
}
