import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.scss']
})
export class EnterDetailsComponent implements OnInit {
  storedCustomize: any;
  customize: any;
  branches: any = [];
  appointment: any = {};
  addresses: any;

  constructor(private router: Router, 
    private customizeService: CustomizeService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
    if(this.customize.appointment) {
      this.appointment = this.customize.appointment;
    }

    // fetch branches
    this.customizeService.getBranch().subscribe(
      (res: any) => this.branches = res.data);

    // fetch addresses
    this.userService.getAddress().subscribe((res: any) => {
      this.addresses = res.data;
    });  
  }

  // book appointment
  onBookAppointment(form: NgForm) {
    this.customize.appointment = form.value;
    localStorage.setItem('customize', JSON.stringify(this.customize));
    this.router.navigate(['/customize/my-thobe']);
  }

  addNewAddress() {
    this.router.navigate(['/my-account/add-new-address'], {queryParams: {appointment: true}})
  }
}
