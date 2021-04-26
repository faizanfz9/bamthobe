import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-gift-card-detail',
  templateUrl: './gift-card-detail.component.html',
  styleUrls: ['./gift-card-detail.component.scss']
})
export class GiftCardDetailComponent implements OnInit {
  id: any;
  giftCard: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.userService.giftCardDetail(this.id).subscribe((res: any) => {
      this.giftCard = res.data;
    })
  }

}
