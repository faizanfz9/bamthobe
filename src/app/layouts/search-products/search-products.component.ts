import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {
  searchQuery: any;
  products: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // Show search related products
    this.route.queryParams.subscribe(res => {
      this.searchQuery = res.query;

      this.products = null;
      this.productService.searchProduct(this.searchQuery).
      subscribe((res: any) => this.products = res.data);
    })
  }

}
