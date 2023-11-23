import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../type-Interface';
import { ProductService } from '../services/product/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';   //menutype property for switch operation
  sellerName:string="";        // name of seller
  userName:string="";         // name of user
  searchResult:undefined|product[];  // serch results
  cartItems=0;  //count of items in cart


  constructor(private route: Router, private product:ProductService) {}



  ngOnInit(): void {
    //subscribe to route events
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore);  //extract user's name from saved data
            this.sellerName=sellerData.name;
          if ( !this.sellerName ) {                             //if undefined 
            let sellerData =sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
          }
          this.menuType = 'seller';            //sets menu to seller switch case
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user'); //extract user's name from saved data
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';                              //sets menu type to user case
          this.product.getCartList(userData.id);           //gets items list based on user ID
        }
         else {
          this.menuType = 'default'; //sets default
        }
      }
    });

    // update the no of items in cart
    let cartData= localStorage.getItem('localCart'); 
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{ //subscribe to take count whenever changes 
      this.cartItems = items.length
    })
  }





//logout the seller
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }



// Logout the user
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }



// Search Product using key up event
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
       
        if(result.length>5){
          result.length=5 //limit max result to 5
        }
        this.searchResult=result;
      })
    }
  }



// hide after blur the input field
  hideSearch(){
    this.searchResult=undefined
  }



  //redirect to product details page using roduct id
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }



 // navigate search page after submiting the query
  submitSearch(val:string){
    // console.warn(val)
  this.route.navigate([`search/`+val]);
  }
}
