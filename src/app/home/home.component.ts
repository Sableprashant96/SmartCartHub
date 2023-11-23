import { Component, OnInit } from '@angular/core';
import { product } from '../type-Interface';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

 popularProducts: undefined | product[]; //popular products array
 trendyProducts: undefined | product[];  //popular products array


  constructor(private product:ProductService) {}



  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{ //GET popular products
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{ //GET trending products
      this.trendyProducts=data;
    })
  }


}
