import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { VerifyComponent } from '../verify/verify.component';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openLoginModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(ChangePwdComponent, { centered: true });
  }

  openVerifyModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(VerifyComponent, { centered: true });
  }
  
}
