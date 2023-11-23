import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../type-Interface';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData:undefined | product; //store product data
  productQuantity:number=1;  //Qty selected by uses
  removeCart=false;   //toggle remove from cart button
  cartData:product|undefined;  //items in cart


  constructor(private activeRoute:ActivatedRoute, private product:ProductService) { }



  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId'); //take id from route
    // console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{ //retrive data based on id
      this.productData= result;
       //to check product is already in cart 
      let cartData= localStorage.getItem('localCart');  //local cart check
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString()); //match the product IDs
        if(items.length){
          this.removeCart=true //remove from cart button enabled
        }else{
          this.removeCart=false //remove from cart button disabled
        }
      }
    // to check cart for logged in user by matching IDs
      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.cartData=item[0]; 
        this.removeCart=true; //remove from cart is enabled 
       }
        })
      }
      
      
      
    })
    
  }
  // handle quantity
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){   ///if user not logged in 
        this.product.localAddToCart(this.productData);  //service called 
        this.removeCart=true //toggle remove 
      }else{
        let user = localStorage.getItem('user'); //if user logged in 
        let userId= user && JSON.parse(user).id; // extract Id of user from local
        let cartData:cart={
          ...this.productData,    //create new object using spread operator
          productId:this.productData.id,   // added product ID and user Id
          userId
        }
        delete cartData.id;  //removed cart Id as it not rqd
        //API call to add data in cart object db.json
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
           this.product.getCartList(userId); //show items added in cart
           this.removeCart=true
          }
        })        
      }
      
    } 
  }

  //remove items from cart if 
  removeFromCart(productId:number){
    if(!localStorage.getItem('user')){  //if user not logged in it will remove item
this.product.removeItemFromCart(productId) 
    }else{
      // console.warn("cartData", this.cartData);
      
      this.cartData && this.product.removeFromCart(this.cartData.id) //if user logged in and  added items
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId) //get cart list updated so count will be updated 
      })
    }
    this.removeCart=false //disable remove from cart button
  }


}
