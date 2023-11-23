import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { product } from '../type-Interface';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult:undefined|product[] //store results 


  constructor(private activeRoute: ActivatedRoute, private product:ProductService, private route: Router) { }



  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query'); //get query from route
    // console.warn(query);
    query && this.product.searchProduct(query).subscribe((result)=>{ //pass query to search result
      this.searchResult=result;
      if (result.length===0){
        alert("No Results for this!")
        this.route.navigate([''])
      }
    })
  }
}
