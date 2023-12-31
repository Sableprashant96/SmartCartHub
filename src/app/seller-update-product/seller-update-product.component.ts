import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../type-Interface';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})

export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product;
  productMessage: undefined | string;


  constructor(private route: ActivatedRoute, private product: ProductService) {}


  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');  //get id of product from route
    // console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
        console.warn(data); //get data of that product
        this.productData = data;
      }); 
  }

//update changed details to db
  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id; 
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
      }
    });
    setTimeout(() => { //timer for msg
      this.productMessage = undefined;
    }, 3000);
    console.warn(data);
  }
}
