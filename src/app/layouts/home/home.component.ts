import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/shared/services/config.service';
import { ProductService } from 'src/app/shared/services/product.service';

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
  catData: any;
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
      this.catData = res.data;
    });

    // fetch featured thobe products
    this.productService.getThobes().subscribe((res: any) => {
      this.thobes = res.data;
    })

    // fetch featured shawls products
    this.productService.getShawls().subscribe((res: any) => {
      this.shawls = res.data;
    })

    // fetch featured attars products
    this.productService.getAttars().subscribe((res: any) => {
      this.attars = res.data;
    })

    // fetch featured cufflinks products
    this.productService.getCufflinks().subscribe((res: any) => {
      this.cufflinks = res.data;
    })
  }

}
