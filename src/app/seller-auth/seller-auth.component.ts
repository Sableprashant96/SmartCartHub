import { Component, OnInit } from '@angular/core';
import { signUp } from '../type-Interface';
import { SellerService } from '../services/seller/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogin=false;
  authError:String='';
  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: signUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
    alert("Registration successfull. Click ok to login!")
    this.openLogin()
  }
  login(data: signUp): void {
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
