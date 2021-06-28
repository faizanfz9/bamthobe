import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from '../modals/login/login.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: any;
  product: any;
  isAddedToCart = false;
  isLogin = false;
  imgRegex = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)/g);

  averageReview: any;

  constructor(private route: ActivatedRoute, 
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // fetch selected product details
    this.route.params.subscribe(res => {
      this.productId = res.id;
      this.product = null;
      this.productService.getProductById(this.productId).subscribe((res: any) => {
        this.product = res.data;
        let totalReview = res.data.review.length; 
        if(totalReview > 0) {
          var reviewSum = res.data.review.reduce((total: any, num: any) => {
            return +total.star + +num.star;
          }) 
          if(totalReview == 1) {
            reviewSum = +reviewSum.star;
          }
          this.averageReview = reviewSum / (totalReview * 5) * 5; 
        }


        this.spinner.hide();
      })
      // check if product is already added to cart
      if(this.isLogin) {
        this.productService.viewCart().subscribe((res: any) => {
          this.isAddedToCart = res.data.normal.
          some((item: any) => this.productId == item.product_id);
        })
      }
    })

    // check if user is authenticated
    this.authService.user.subscribe(res => {
      this.isLogin = res.isLogin;
    });
    this.isLogin = this.authService.isAuthenticated();
  }

  // Add to cart
  onAddToCart() {
    if(this.isLogin) {
      let product = new FormData();
      product.append('product_id', this.productId);
      product.append('quantity', '1');
      product.append('type', 'normal');

      this.spinner.show();
      this.productService.addToCart(product).subscribe(res => {
        this.spinner.hide();
        this.isAddedToCart = true;
        this.userService.updateUser();
        console.log(res);
      }, error => {
        this.spinner.hide();
      })
    }else {
      // Open login modal
      this.modalService.open(LoginComponent, { centered: true });
    }
  }

}
