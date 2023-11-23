import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../type-Interface';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined; 
  //price summary object
  priceSummary: priceSummary = {  
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }


  constructor(private product: ProductService, private router: Router) { }


  ngOnInit(): void {
   this.loadDetails()
  }

  
  //api calling to remove added products in cart
  removeFromCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeFromCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }


 //retrive current cart details
  loadDetails(){
    this.product.currentCart().subscribe((result) => {  //api call
      this.cartData = result;
      // console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {          //calculate final price
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;                   //final price summary
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10); 

    if(!this.cartData.length){  //nav to home if no cart data available
      this.router.navigate(['/'])
    }

    })
  }



   // nav to checkout page
  checkout() {
    this.router.navigate(['/checkout'])
  }

}
