import { Component, OnInit } from '@angular/core';
import { product } from '../type-Interface';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})

export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined; //msg


  constructor(private product: ProductService) {}


  ngOnInit(): void {}


// add new product data 
  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => { //timer for msg
      this.addProductMessage=undefined
    }, 3000);
  }
}
