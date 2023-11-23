import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { logIn, signUp } from '../../type-Interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {


  isSellerLoggedIn= new BehaviorSubject<boolean>(false); //observale to check status for Auth guard
  isLoginError= new EventEmitter<boolean>(false)   //event for invalid user detection


  constructor(private http:HttpClient, private router:Router) { }


  // API to user signup
  userSignUp(data:signUp){
    this.http.post('http://localhost:3000/seller',
    data,{observe:'response'}).subscribe((result)=>{
      if(result){

        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
    })
  } 

// checks local if login details is stored
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true) //emit logged in
      this.router.navigate(['seller-home'])
    }
  }


  
  userLogin(data:logIn){
   this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe(( result:any )=>{
    console.warn(result)
    if(result && result.body && result.body.length===1){
      this.isLoginError.emit(false)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }else{
      console.warn("login failed");
      this.isLoginError.emit(true)
    }
   })
  }
}
