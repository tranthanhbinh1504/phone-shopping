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
    getCartTotal()
  }

  listCart() {
    this.cartItems = this.cartService.getListCart()
  }

  totalPrice() {
    this.cartTotal = this.cartService.getCartTotal()
  }
}
function getCartTotal() {
  throw new Error('Function not implemented.')
}
