import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from '../../modals/login/login.component';

@Component({
  selector: 'app-my-thobe',
  templateUrl: './my-thobe.component.html',
  styleUrls: ['./my-thobe.component.scss']
})
export class MyThobeComponent implements OnInit {
  storedCustomize: any;
  customize: any;
  isLogin = false;

  constructor(private customizeService: CustomizeService, 
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authService: AuthService, 
    private modalService: NgbModal
    ) {
      // checking user authentication
      this.authService.user.subscribe(res => {
        this.isLogin = res.isLogin;
      })
      this.isLogin = this.authService.isAuthenticated();
     }

  ngOnInit(): void {
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
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
