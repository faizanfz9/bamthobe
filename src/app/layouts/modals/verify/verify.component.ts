import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openLoginModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(LoginComponent, { centered: true });
  }

  openChangePwdModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(ChangePwdComponent, { centered: true });
  }

}
