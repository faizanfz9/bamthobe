import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from '../../modals/login/login.component';

@Component({
  selector: 'app-my-thobe',
  templateUrl: './my-thobe.component.html',
  styleUrls: ['./my-thobe.component.scss']
})
export class MyThobeComponent implements OnInit {
  storedCustomize: any;
  customize: any;
  isLogin = false;

  constructor(private router: Router, 
    private authService: AuthService,
    private modalService: NgbModal) {
    // checking user authentication
    this.authService.user.subscribe(res => {
      this.isLogin = res.isLogin;
    })
    this.isLogin = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
  }

  goToMeasurement() {
    if(this.isLogin) {
      this.router.navigate(['/customize/measurement']);
    }else {
      this.open();
    }
  }

  // Open login modal
  open() {
    this.modalService.open(LoginComponent, { centered: true });
  }

}
