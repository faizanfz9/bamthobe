import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/shared/services/config.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { map } from 'rxjs/operators';

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
  thobes: any;
  shawls: any;
  attars: any;
  cufflinks: any;

  constructor(private configService: ConfigService, 
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // fetch banner slides
    this.spinner.show();
    this.configService.bannerSlides().subscribe((res: any) => {
      this.spinner.hide();
      this.slides = res.data;
    }, error => {
      this.spinner.hide();
    });

    // fetch product cat images
    this.configService.productCat().subscribe((res: any) => {
      this.specialCat = res.data;
    });

    // fetch featured thobe products
    this.productService.getProducts(4).pipe(map((res: any) => 
    res.data.slice(0, 4))).subscribe((res) => {
      this.thobes = res;
    })

    // fetch featured shawls products
    this.productService.getProducts(7).pipe(map((res: any) => 
    res.data.slice(0, 4))).subscribe((res: any) => {
      this.shawls = res;
    })

    // fetch featured attars products
    this.productService.getProducts(8).pipe(map((res: any) => 
    res.data.slice(0, 4))).subscribe((res: any) => {
      this.attars = res;
    })

    // fetch featured cufflinks products
    this.productService.getProducts(6).pipe(map((res: any) => 
    res.data.slice(0, 4))).subscribe((res: any) => {
      this.cufflinks = res;
    })
  }

}
