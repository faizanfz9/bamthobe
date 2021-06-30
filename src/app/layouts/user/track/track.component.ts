import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  orderId: any;
  order: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params.id;

    this.userService.getOrderById(this.orderId).
    subscribe((res: any) => {
      this.order = res.data;
      console.log(this.order);
    });
  }

}