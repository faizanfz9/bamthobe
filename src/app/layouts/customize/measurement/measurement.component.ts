import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {
  measureType: any = [
    {
      id: 0,
      value: "Branch Appointment"
    },
    {
      id: 1,
      value: "Home Visit"
    }
  ];
  measureTypeId: any;
  storedCustomize: any;
  customize: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
    if(this.customize.measureType) {
      this.measureTypeId = this.customize.measureType.id;
    }
  }

  // Select measure type
  onSelectMeasureType(measure_type: any) {
    this.measureTypeId = measure_type.id;
    this.customize.measureType = measure_type;
    localStorage.setItem('customize', JSON.stringify(this.customize));
  }

  onConfirm() {
    if(this.measureTypeId == 0) {
      this.router.navigate(['/customize/enter-details']);
    }else {
      this.router.navigate(['/customize/my-thobe']);
    }
  }
}
