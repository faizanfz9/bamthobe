import { Component, OnInit } from '@angular/core';
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

  constructor(private productService: ProductService, 
    private userService: UserService,
    private authService: AuthService,
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
  }

  fetchCart() {
    this.productService.viewCart().subscribe((res: any) => {
      this.addedProducts = res.data;
    })
  }

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

  onRemoveFromCart(cartId: any) {
    let cart_id = new FormData();
    cart_id.append('cart_id', cartId);

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

}
