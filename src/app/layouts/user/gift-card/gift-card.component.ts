import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent implements OnInit {
  giftCards: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.giftCardList().subscribe((res: any) => 
    this.giftCards = res.data);
  }

}
