import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private sellerService:SellerService){}

  //gurd for seller login 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('seller')){
       return true;
      }
      return this.sellerService.isSellerLoggedIn;
  }
  
} 
