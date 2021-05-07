import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  active = 1;
  onGoings: any;
  olders: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAppointment().subscribe((res: any) => {
      this.onGoings = res.data;
      console.log(res.data);
    })
    // this.userService.getOlderAppointment().subscribe((res: any) => {
    //   this.olders = res.data;
    //   console.log(res.data);
    // })
  }

}
