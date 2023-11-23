import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../type-Interface';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined; //stores price
  cartData: cart[] | undefined;   //items in cart
  orderMsg: string | undefined;   // order msg property


  constructor(private product: ProductService, private router: Router) { }



  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {        //intialize with current items in cart  

      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity) //calculate total price
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      // console.warn(this.totalPrice);

    })
  }



  // order now API calling function
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {                 // cart data will be cleared after placing order
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700)
      })
      //API call
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders']) //nav to orders list
          }, 4000);

        }

      })
    }

  }

}
