import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  active = 1;
  orders: any;
  previousOrders: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // fetch orders
    this.userService.getOrders().subscribe((res: any) => {
      this.orders = res.data;
      console.log(this.orders);
    })

    // fetch previous orders
    this.userService.getPreviousOrders().subscribe((res: any) => {
      this.previousOrders = res.data;
    })
  }
}
