import { AfterContentChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { 
     this.user =  this.authService.getLoggedUser();
     this.authService.user.subscribe(res => {
        if(res.data) {
          this.user = res.data;
        }
     });
  }

  ngOnInit(): void {
  }

}
