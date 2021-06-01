import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categoryId: any;
  categoryName: any;
  products: any;
  isLowToHigh = false;
  isHighToLow = false;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // fetch products according to their category
    this.route.params.subscribe(res => {
      this.categoryId = res.catId;
      this.categoryName = this.route.snapshot.queryParams.category;

      this.products = null;
      this.productService.getProducts(this.categoryId).
      subscribe((res: any) => this.products = res.data);
    })
  }

  lowToHigh() {
    this.isHighToLow = false;
    this.isLowToHigh = true;
    this.products = this.products.sort(function(a: any, b: any){
      return a.cost - b.cost;
    })
  }

  highToLow() {
    this.isLowToHigh = false;
    this.isHighToLow = true;
    this.products = this.products.sort(function(a: any, b: any){
      return  b.cost - a.cost;
    })
  }

}
