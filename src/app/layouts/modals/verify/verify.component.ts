import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  @Input() mobile: any;
  @Input() isForgotPwd = false;

  constructor(public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private authService: AuthService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  // Open Login Modal
  openLoginModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(LoginComponent, { centered: true });
  }

  // Open Reset Password Modal
  openChangePwdModal() {
    this.activeModal.dismiss('Cross click');
    const modalRef = this.modalService.open(ChangePwdComponent, { centered: true });
    modalRef.componentInstance.mobile = this.mobile;
  }

  // Verify Otp that is sent to user mobile numeber
  onVerifyOtp(form: NgForm) {
    let otpInfo = new FormData();
    otpInfo.append('mobile', this.mobile);
    otpInfo.append('otp', form.value.otp);
    this.spinner.show();

    if(this.isForgotPwd) {
      this.authService.resetVerifyOtp(otpInfo).subscribe((res: any) => {
        this.spinner.hide();
        this.openChangePwdModal();
      }, error => {
        this.spinner.hide();
      })
    }else {
      this.authService.verifyOtp(otpInfo).subscribe((res: any) => {
        alert(res.message);
        this.spinner.hide();
        this.openLoginModal();
      }, error => {
        this.spinner.hide();
      })
    }
  }
}
