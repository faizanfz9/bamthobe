import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {
  @Input() mobile: any;

  constructor(public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private authService: AuthService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  // Open login modal
  openLoginModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(LoginComponent, { centered: true });
  }

  // Reset password
  onResetPwd(form: NgForm) {
    let newPwd = new FormData();
    newPwd.append('mobile', this.mobile);
    newPwd.append('password', form.value.password);
    newPwd.append('password_confirmation', form.value.cnfPassword);

    this.spinner.show();
    this.authService.resetPwd(newPwd).subscribe((res: any) => {
      this.spinner.hide();
      alert(res.message);
      this.openLoginModal();
    }, error => {
      this.spinner.hide();
    })
  }
}
