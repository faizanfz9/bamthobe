import { Component, OnInit } from '@angular/core';
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
  }

  fetchCart() {
    this.productService.viewCart().subscribe((res: any) => {
      this.addedProducts = res.data;
      console.log(this.addedProducts);
    })
  }

  // increase or descrese product quantity
  manageQty(initialQty: any, currentQty: any, productId: any) {
    let totalQty = +initialQty + currentQty;
    let productQty = new FormData();
      productQty.append('product_id', productId);
      productQty.append('quantity', totalQty);

      this.spinner.show();
      this.productService.addToCart(productQty).subscribe(res => {
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

  // Proceed to checkout
  goToCheckout() {
    if(confirm('Do you want to proceed to checkout?')) {
      this.router.navigate(['/checkout'], { queryParams: { total: this.addedProducts.grand_total } });
    }
  }

}
