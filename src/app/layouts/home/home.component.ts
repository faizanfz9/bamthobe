import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  customOptions: any = {
    loop: true,
    dots: true,
    nav: false,
    items: 1,
    marginR: 0,
    marginL: 0
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4
    //   }
    // },
  }

  slides: any;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.getBannerSlides().subscribe((res: any) => this.slides = res.data);
  }

}
