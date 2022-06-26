import { Component, OnInit } from '@angular/core'
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []

  cartTotal = 0

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.listCart()
    this.totalPrice()
  }

  listCart() {
    this.cartItems = this.cartService.getListCart()
  }

  totalPrice() {
    this.cartTotal = this.cartService.getCartTotal()
  }

  addItem(product: any) {
    this.cartService.addItem(product)
  }

  removeItem(product: any) {
    this.cartService.removeItem(product)
  }
}
