import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from '../../modals/login/login.component';

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
  selected: any = false;
  measurements: any;
  measurementId: any;
  isLogin = false;

  constructor(private router: Router, 
    private userService: UserService, 
    private spinner: NgxSpinnerService,
    private customizeService: CustomizeService,
    private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
     // checking user authentication
     this.authService.user.subscribe(res => {
      this.isLogin = res.isLogin;
    })
    this.isLogin = this.authService.isAuthenticated();

    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
    if(this.customize.measureType) {
      this.measureTypeId = this.customize.measureType.id;
      this.selected = true;
    }

    if(this.customize.measurement) {
      this.measurementId = this.customize.measurement.id;
      this.selected = true;
    }

    this.userService.getMeasurement().subscribe((res: any) => {
      this.measurements = res.data;
    })
  }

  // Select measurement
  selectMeasurement(measurement: any) {
    this.measurementId = measurement.id;
    this.selected = true;
    this.measureTypeId = null;

    delete this.customize.measureType;
    this.customize.measurement = measurement;
    localStorage.setItem('customize', JSON.stringify(this.customize));
  }

  // Select measure type
  onSelectMeasureType(measure_type: any) {
    this.measurementId =  null;

    this.measureTypeId = measure_type.id;
    this.selected = true;

    delete this.customize.measurement;
    this.customize.measureType = measure_type;
    localStorage.setItem('customize', JSON.stringify(this.customize));
  }

  onConfirm() {
    if(this.measurementId) {
      this.onAddToCart();
    }else {
      this.router.navigate(['/customize/enter-details']);
    }
  }

  onAddToCart() {
    if(!this.isLogin) {
      this.open();
    }else {
      let thobe = new FormData();
      thobe.append('fabric', this.customize.fabric.id);
      thobe.append('collar', this.customize.collar.id);
      thobe.append('cuffs', this.customize.cuff.id);
      thobe.append('pocket', this.customize.pocket.id);
      thobe.append('placket', this.customize.placket.id);
      thobe.append('button', this.customize.button.id);
      thobe.append('side_pocket', this.customize.pocketSide.id);
      if(this.customize.pocketSide.id == 0) {
        thobe.append('side_pocket_2', this.customize.pocketDirection.id);
      }
      if(this.customize.measurement) {
        thobe.append('measurement', this.customize.measurement.id);
      }else {
        thobe.append('measurement_type', this.customize.measureType.id);
        thobe.append('name', this.customize.appointment.name);
        thobe.append('mobile', this.customize.appointment.phone);
        thobe.append('date', this.customize.appointment.date);
        if(this.customize.measureType.id == 0) {
          thobe.append('branch', this.customize.appointment.branch);
        }
        if(this.customize.measureType.id == 1) {
          thobe.append('address', this.customize.appointment.address);
        }
      }
  
      this.spinner.show();
      this.customizeService.addToCart(thobe).subscribe(res => {
        this.spinner.hide();
        this.customize = null;
        localStorage.removeItem("customize");
        this.userService.updateUser();
        this.router.navigate(['/my-cart']);
      }, error => {
        this.spinner.hide();
      })
    }
  }

  // Open login modal
  open() {
    this.modalService.open(LoginComponent, { centered: true });
  }
}
