import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPwdComponent } from '../forgot-pwd/forgot-pwd.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openRegisterModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(RegisterComponent, { centered: true });
  }

  openForgotPwdModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(ForgotPwdComponent, { centered: true });
  }
}
