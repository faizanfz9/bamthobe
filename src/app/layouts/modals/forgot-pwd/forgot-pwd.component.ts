import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { VerifyComponent } from '../verify/verify.component';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {
  mobile: any;

  constructor(public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private authService: AuthService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  openLoginModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(ChangePwdComponent, { centered: true });
  }

  openVerifyModal() {
    this.activeModal.dismiss('Cross click');
    const modalRef = this.modalService.open(VerifyComponent, { centered: true });
    modalRef.componentInstance.mobile = this.mobile;
    modalRef.componentInstance.isForgotPwd = true;
  }
  
  onChangePwd(form: NgForm) {
    let mobile = new FormData();
    mobile.append('mobile', form.value.phone);
    this.mobile = form.value.phone;

    this.spinner.show();
    this.authService.forgotPwd(mobile).subscribe(res => {
      this.spinner.hide();
      this.openVerifyModal();
    }, error => {
      this.spinner.hide();      
    })
  }  
}
