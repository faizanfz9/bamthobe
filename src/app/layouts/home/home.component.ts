import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/shared/services/config.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  // init banner sliders
  customOptions: any = {
    loop: true,
    dots: true,
    nav: false,
    items: 1,
    marginR: 0,
    marginL: 0
  }
  slides: any;
  specialCat: any;
  featuredCat: any;
  featuredProducts: any = [];
  addedProducts: any;

  constructor(private configService: ConfigService, 
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // fetch banner slides
    this.configService.bannerSlides().subscribe((res: any) => {
      this.slides = res.data;
    });

    // fetch special categories
    this.configService.specialCat().subscribe((res: any) => {
      this.specialCat = res.data;
    });

    // fetch products as per category
    this.spinner.show();
    this.productService.getProductsCat().subscribe((res: any) => {
      this.featuredCat = res.data.filter((item: any) => item.type == 'normal');
      let productUrlArr: any = [];
      this.featuredCat.forEach((item: any) => {
        productUrlArr.push(this.productService.getProducts(item.id).
        pipe(map((res: any) => res.data.slice(0, 4))));
      })
      forkJoin(productUrlArr).subscribe((res: any) => {
        this.spinner.hide();
        this.featuredProducts = res;
      })
    })

    // fetch added prouducts
    this.productService.viewCart().subscribe((res: any) => {
      this.addedProducts = res.data.normal;
    })
  }
  
  // checking if any product is already added
  isAddedToCart(productId: any) {
    return this.addedProducts.some((item: any) => item.product_id == productId);
  }

}
