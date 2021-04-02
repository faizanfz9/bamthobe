import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { VerifyComponent } from '../verify/verify.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openLoginModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(LoginComponent, { centered: true });
  }

  openVerifyModal() {
    this.activeModal.dismiss('Cross click');
    this.modalService.open(VerifyComponent, { centered: true });
  }
  
}
