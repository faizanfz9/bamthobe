import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offers: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // fetch offers
    this.userService.getOffers().subscribe((res: any) => {
      this.offers = res.data;
    })
  }

}
