import { Component, OnInit } from '@angular/core';
import { logIn, signUp } from '../type-Interface';
import { SellerService } from '../services/seller/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {


  showLogin=false; //toggle property
  authError:String=''; //erraor msg


  constructor(private seller: SellerService) {}


  ngOnInit(): void {
    this.seller.reloadSeller() //checks local if login details is stored
  }

//signup new user
  signUp(data: signUp): void {
    this.seller.userSignUp(data);
  }


//login old user
  login(data: logIn): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is Incorrect"; 
      }
    })
  }


  openLogin(){
    this.showLogin=false
  }


  openSignUp(){
    this.showLogin=true
  }
}
