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

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // fetch products according to their category
    this.categoryId = this.route.snapshot.params.catId;
    this.categoryName = this.route.snapshot.queryParams.category;

    this.productService.getProducts(this.categoryId).
    subscribe((res: any) => this.products = res.data);
  }

}
