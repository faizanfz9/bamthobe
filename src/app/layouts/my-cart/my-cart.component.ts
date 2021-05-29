import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  addedProducts: any;
  itemsInCart: any;
  promo_code: any;
  toggled = false;
  totalPoints: any

  constructor(private productService: ProductService, 
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // fetch user cart
    this.itemsInCart = this.authService.getLoggedUser() ? 
    this.authService.getLoggedUser().total_cart : 0;
    this.authService.user.subscribe(res => {
      if(res.data) {
        this.itemsInCart = res.data.total_cart;
      }
    })
    this.fetchCart();
    this.promo_code = localStorage.getItem('promo');

    // fetch loyality points
    this.userService.getLoyalityPoints().subscribe((res: any) => {
      this.totalPoints = res.data.total_points;
    })
  }

  fetchCart() {
    this.productService.viewCart().subscribe((res: any) => {
      this.addedProducts = res.data;
    })
  }

  // increase or descrese product quantity
  manageQty(currentQty: any, product: any) {
    let totalQty = +product.quantity + currentQty;
    let productQty = new FormData();
    productQty.append('quantity', totalQty);
    productQty.append('type', product.type);
      if(product.type == 'customize') {
        productQty.append('cart_id', product.id);
      }
      if(product.type == 'normal') {
        productQty.append('product_id', product.product_id);
      }
     
      this.spinner.show();
      this.productService.addToCart(productQty).subscribe(res => {
        console.log(res);
        this.spinner.hide();
        this.fetchCart();
        this.userService.updateUser();
      }, error => {
        this.spinner.hide();
      })
  }

  // Remove product from cart
  onRemoveFromCart(cartId: any, type: any) {
    let cart_id = new FormData();
    cart_id.append('cart_id', cartId);
    cart_id.append('type', type);

    if(confirm('Do you want to remove this product?')) {
      this.spinner.show();
      this.productService.removeFromCart(cart_id).subscribe(res => {
        this.spinner.hide();
        this.fetchCart();
        this.userService.updateUser();
      }, error => {
        this.spinner.hide();
      }) 
    }
  }

  // Apply promocode
  onApplyPromo(promoCode: any) {
    let promo = new FormData();
    promo.append('coupon_id', promoCode);
    this.promo_code = promoCode;
    localStorage.setItem('promo', this.promo_code);

    this.spinner.show();
    this.productService.applyPromo(promo).subscribe((res: any) => {
      console.log(res.message);
      this.spinner.hide();
      this.fetchCart();
    })
  }

  // Apply Loyality Points
  onApplyLoyalityPoints() {
    if(this.totalPoints > 100) {
      this.spinner.show();
      this.productService.applyLoyalityPoints().subscribe(res => {
        this.spinner.hide();
        this.toggled = true;
        this.fetchCart();
      })
    }else {
      alert("You don't have enough loyality points!");
    }
  }

  // Proceed to checkout
  goToCheckout() {
    if(confirm('Do you want to proceed to checkout?')) {
      this.router.navigate(['/checkout'], { queryParams: { total: this.addedProducts.grand_total } });
    }
  }

}
