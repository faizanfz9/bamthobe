import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  addressId: any;
  grandTotal: any;

  constructor(private route: ActivatedRoute, 
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UserService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.addressId = +this.route.snapshot.queryParams.addressId;
    this.grandTotal = this.route.snapshot.queryParams.total;
  }

  onPlaceOrder() {
    let cart = new FormData();
    cart.append("address_id", this.addressId);
    cart.append("grand_total", this.grandTotal);

    this.spinner.show();
    this.productService.placeOrder(cart).subscribe((res: any) => {
      this.spinner.hide();
      this.userService.updateUser();
      this.router.navigate(['/thank-you'], { queryParams: { orderId:  res.data } });
    }, error => {
      this.spinner.hide();
    })
  }

}
