import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductService } from 'src/app/shared/services/product.service';
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

  constructor(private route: ActivatedRoute, 
    private authService: AuthService,
    private modalService: NgbModal,
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // fetch selected product details
    this.productId = this.route.snapshot.params.id;
    this.productService.getProductById(this.productId).subscribe((res: any) => {
      this.product = res.data;
      this.spinner.hide();
    })

    // check if user is authenticated
    this.authService.user.subscribe(res => {
      this.isLogin = res.isLogin;
    });
    this.isLogin = this.authService.isAuthenticated();

    // check if product is already added to cart
    this.productService.viewCart().subscribe((res: any) => {
      this.isAddedToCart = res.data.some((item: any) => this.productId == item.product_id);
    })
  }

  // Add to cart
  onAddToCart() {
    if(this.isLogin) {
      let productQty = new FormData();
      productQty.append('product_id', this.productId);
      productQty.append('quantity', '1');

      this.spinner.show();
      this.productService.addToCart(productQty).subscribe(res => {
        this.spinner.hide();
        this.isAddedToCart = true;
      }, error => {
        this.spinner.hide();
      })
    }else {
      // Open login modal
      this.modalService.open(LoginComponent, { centered: true });
    }
  }

}
