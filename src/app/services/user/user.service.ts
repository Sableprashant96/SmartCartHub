import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { logIn, signUp } from '../../type-Interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


invalidUserAuth= new EventEmitter<boolean>(false)   //event for invalid user detection

constructor(private http: HttpClient, private router:Router) { }

//user signup API
  userSignUp(user:signUp){
   this.http.post('http://localhost:3000/users',user,{observe:'response'})
   .subscribe((result)=>{
    if(result){
      localStorage.setItem('user',JSON.stringify(result.body)); //store local
      this.router.navigate(['/']); //navigate home
    }
    
   })
    
  }
  //user login API
  userLogin(data:logIn){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){           // check result if 
        localStorage.setItem('user',JSON.stringify(result.body[0])); // store local
        this.router.navigate(['/']);         // nav default home 
        this.invalidUserAuth.emit(false)   //emit false if result fount 
      }else{
        this.invalidUserAuth.emit(true)  // emit true if no result
      }
    })
  }

  // func to reload user if it is not logged out and trying to log in
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
