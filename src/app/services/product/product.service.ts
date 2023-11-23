import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../../type-Interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>(); // event emitter for items count in cart


  constructor(private http: HttpClient) { }

  //Add Product API by seller
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  //Get product list API
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
   // Delete product by seller
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }


  //Get product details by its ID
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  
  //Update product details by product ID
  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  //Get top 3 popular products for carousel
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
 //Get top 8 trending products for carousel
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
// search products using query
  searchProduct(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
// add data in local cart 
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {    //if there is not already data in local cart
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]); //cart count event
    } else {
      cartData = JSON.parse(localCart); //if there is already data in local cart it will push more
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData); //cart count event
    }
  }
//remove items from cart using product Id withou user logged
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart'); //get tthe data from local
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id); //filter out remaining items 
      localStorage.setItem('localCart', JSON.stringify(items)); //set the new array which is without removed product 
      this.cartData.emit(items); //update cart count
    }
  }

  //POST data in cart API 
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  //GET items list in cart based on user ID
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body); //update count of items in cart
        }
      });
  }

  //delete items from cart API 
  removeFromCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }


  //GET cart list based on user logged in 
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  //POST order Details API
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }


  //GET list of orders based on Loggedin user
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  //delete items from cart after placing order
  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);    //update count of items in cart
    })
  }
 // cancel order API 
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)

  }

}
