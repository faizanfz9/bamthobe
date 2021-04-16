import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  addresses: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAddress().subscribe((res: any) => {
      this.addresses = res.data;
    });
  }

}
