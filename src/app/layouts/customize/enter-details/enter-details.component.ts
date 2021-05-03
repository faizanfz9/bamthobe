import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.scss']
})
export class EnterDetailsComponent implements OnInit {
  storedCustomize: any;
  customize: any;
  appointment: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
    if(this.customize.appointment) {
      this.appointment = this.customize.appointment;
    }
  }

  // book appointment
  onBookAppointment(form: NgForm) {
    this.customize.appointment = form.value;
    localStorage.setItem('customize', JSON.stringify(this.customize));
    this.router.navigate(['/customize/my-thobe']);
  }
}
