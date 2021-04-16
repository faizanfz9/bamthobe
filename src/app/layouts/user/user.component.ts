import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
  }

}
