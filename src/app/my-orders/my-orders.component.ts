import { Component, OnInit } from '@angular/core';
import { order } from '../type-Interface';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData:order[]|undefined


  constructor(private product:ProductService) { }



  ngOnInit(): void {
    this.getOrderList()
  }


//cancel order based on order Id
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }


  //list of ordered product
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

}
