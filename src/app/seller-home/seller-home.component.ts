import { Component, OnInit } from '@angular/core';
import { product } from '../type-Interface';
import { ProductService } from '../services/product/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {


  productList: undefined | product[]; //products list array
  productMessage: undefined | string; //msg property
  icon = faTrash; //delete icon
  iconEdit=faEdit; //update icon


  constructor(private product: ProductService) {}


  ngOnInit(): void {
    this.list();
  }


//delete the product from list
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        alert("Product is deleted")
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  //retrives the list of products
  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
