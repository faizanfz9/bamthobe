import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from '../../modals/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  isLoggedIn: any;
  user: any;

  constructor(private modalService: NgbModal,
    private userService: UserService, 
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  // checking user authentication
  ngOnInit(): void {
    this.authService.user.subscribe(res => {
      this.isLoggedIn = res.isLogin;
      this.user = res.data;
    })
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.userService.getLoggedUser();
  }

  // Open login modal
  open() {
    this.modalService.open(LoginComponent, { centered: true });
  }

  // do logout
  onLogout() {
    this.spinner.show();
    setTimeout(()=> {
      localStorage.clear();
      this.authService.user.next({isLogin: false, data: null});
      this.router.navigate(['/']);
      this.spinner.hide();
    }, 1500);
  }

}

