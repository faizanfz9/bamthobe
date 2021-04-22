import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: any;
  product: any;
  imgRegex = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)/g);

  constructor(private route: ActivatedRoute, 
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;

    this.spinner.show();
    this.productService.getProductById(this.productId).subscribe((res: any) => {
      this.product = res.data;
      this.spinner.hide();
    })
  }

}
