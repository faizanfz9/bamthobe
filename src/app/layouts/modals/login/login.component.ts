import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ForgotPwdComponent } from '../forgot-pwd/forgot-pwd.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router) 
    { }

  ngOnInit(): void {
  }

  // Open register modal
  openRegisterModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(RegisterComponent, { centered: true });
  }

  // Open forgot password modal
  openForgotPwdModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(ForgotPwdComponent, { centered: true });
  }
  
  // Initiate user login
  onLogin(form: NgForm) {
    let user = new FormData();
    user.append('mobile', form.value.phone);
    user.append('password', form.value.password);
    this.spinner.show();
    this.authService.login(user).subscribe((res: any) => {
      this.spinner.hide();
      localStorage.setItem('user', JSON.stringify(res.data));
      this.activeModal.dismiss('Cross click');
      this.authService.user.next({isLogin: true, data: res.data});
    }, error => {
      this.spinner.hide();
    })
  }
}
