import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from '../../modals/login/login.component';

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
  isLogin = false;

  lat: any;
  lng: any;

  constructor(private router: Router, 
    private customizeService: CustomizeService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit(): void {
    // checking user authentication
    this.authService.user.subscribe(res => {
      this.isLogin = res.isLogin;
    })
    this.isLogin = this.authService.isAuthenticated();

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
  onBookAppointment(form: NgForm): any {
    this.customize.appointment = form.value;
    if(form.value.branch == 'select') {
      alert("Select Branch First"); 
      return false;
    }
    if(form.value.address == 'select') {
      alert("Select Address First"); 
      return false;
    }
    localStorage.setItem('customize', JSON.stringify(this.customize));
    this.onAddToCart();
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

  showMap(id: any) {
    if(id !== 'select') {
      this.lat = +this.addresses.find((item: any) => item.id == id).lat;
      this.lng = +this.addresses.find((item: any) => item.id == id).lng;
    }
  }

}
