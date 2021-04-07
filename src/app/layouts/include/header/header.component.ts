import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from '../../modals/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  showMenu = false;
  isLoggedIn: any;
  user: any;

  constructor(private modalService: NgbModal, private authService: AuthService) { }

  // checking user authentication
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getLoggedUser();
  }

  ngDoCheck() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getLoggedUser();
  }

  // Open login modal
  open() {
    this.modalService.open(LoginComponent, { centered: true });
  }

  // do logout
  onLogout() {
    localStorage.clear();
  }

}

