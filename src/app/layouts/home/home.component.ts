import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/shared/services/config.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { map, shareReplay } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    marginL: 0,
    autoplay:true
  }
  slides: any;
  specialCat: any;
  featuredCat: any;
  featuredProducts: any = [];
  addedProducts: any;

  constructor(private configService: ConfigService, 
    private productService: ProductService,
    private authService: AuthService,
    private spinner: NgxSpinnerService) { 
      console.log(this.slides);
    }

  ngOnInit(): void {
    // fetch banner slides
     this.spinner.show();
    this.configService.bannerSlides().subscribe((res: any) => {
      this.slides = res.data;
      this.spinner.hide();
    });

    // fetch special categories
    this.configService.specialCat().subscribe((res: any) => {
      this.specialCat = res.data;
    });

    // fetch products as per category
    this.productService.getProductsCat().subscribe((res: any) => {
      this.featuredCat = res.data.filter((item: any) => item.type == 'normal');
      let productUrlArr: any = [];
      this.featuredCat.forEach((item: any) => {
        productUrlArr.push(this.productService.getProducts(item.id).
        pipe(map(
          (res: any) => res.data.slice(0, 4)),
          shareReplay({ bufferSize: 1, refCount: true })
          ));
      })
      forkJoin(productUrlArr).subscribe((res: any) => {
        this.featuredProducts = res;
      })
    })

    // fetch added prouducts
    this.authService.user.subscribe(res => {
      if(res.isLogin) {
        this.productService.viewCart().subscribe((res: any) => {
          this.addedProducts = res.data.normal;
        })
      }
    })
    if(this.authService.isAuthenticated()) {
      this.productService.viewCart().subscribe((res: any) => {
        this.addedProducts = res.data.normal;
      })
    }
  }
  
  // checking if any product is already added
  isAddedToCart(productId: any) {
    if(!this.addedProducts) {
      return false;
    }
    return this.addedProducts.some((item: any) => item.product_id == productId);
  }

}
