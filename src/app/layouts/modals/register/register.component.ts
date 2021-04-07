import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { VerifyComponent } from '../verify/verify.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  mobile: any;

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

  // Open verify modal for OTP
  openVerifyModal() {
    this.activeModal.dismiss('Cross click');
    const modalRef = this.modalService.open(VerifyComponent, { centered: true });
    modalRef.componentInstance.mobile = this.mobile;
  }

  // Initiate registration for new user 
  onRegisterUser(form: NgForm) {
    let newUser = new FormData();
    newUser.append('name', form.value.name);
    newUser.append('email', form.value.email);
    newUser.append('mobile', form.value.phone);
    newUser.append('password', form.value.password);
    newUser.append('password_confirmation', form.value.cnfPassword);
    this.mobile = form.value.phone;

    this.spinner.show();
    this.authService.register(newUser).subscribe((res: any) => {
        this.openVerifyModal();
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      })
    }
  
}
