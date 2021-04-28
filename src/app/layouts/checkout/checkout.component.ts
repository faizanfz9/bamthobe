import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  addresses: any;
  selectedAddId: any;
  grandTotal: any;

  constructor(private userServie: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userServie.getAddress().subscribe((res: any) => {
      this.addresses = res.data;
    })
    this.grandTotal = this.route.snapshot.queryParams.total;
  }

  onChooseAddress(addressId: any) {
    this.selectedAddId = addressId;
  }

}
