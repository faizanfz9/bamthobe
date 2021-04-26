import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-gift-card',
  templateUrl: './create-gift-card.component.html',
  styleUrls: ['./create-gift-card.component.scss']
})
export class CreateGiftCardComponent implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }

  onCreateGift(form: NgForm) {
    let giftCard = new FormData();
    giftCard.append('gift_id', this.id);
    giftCard.append('date', form.value.date);
    giftCard.append('time', form.value.time);
    giftCard.append('g_to', form.value.to);
    giftCard.append('g_from', form.value.from);
    giftCard.append('message', form.value.message);
    giftCard.append('mobile', form.value.mobile);
    giftCard.append('receiver_name', form.value.to);

    this.userService.createGiftCard(giftCard).subscribe((res: any) => {
      alert(res.message);
    })
    
  }

}
