import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  measurements: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // fetch measurements
    this.userService.getMeasurement().subscribe((res: any) => {
      this.measurements = res.data;
    })
  }

}
