import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    // fetch user cart
    this.itemsInCart = this.userService.getLoggedUser().total_cart;

    this.productService.viewCart().subscribe((res: any) => {
      this.addedProducts = res.data;
    })
  }

}
