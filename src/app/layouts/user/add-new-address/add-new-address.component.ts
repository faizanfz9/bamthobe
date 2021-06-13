import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit {
  isForAppointment = false;

  constructor(private userService: UserService, 
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => this.isForAppointment = res.appointment);
  }

  onAddAddress(form: NgForm) {
    let address = new FormData();
    address.append('name', form.value.name);
    address.append('address', form.value.address);
    address.append('home_type', form.value.addressType);

    this.spinner.show();
    this.userService.addAddress(address).subscribe((res: any) => {
      this.spinner.hide();
      alert(res.message);
      this.router.navigate(['/my-account/address-book']);
    }, error => {
      this.spinner.hide();
    })
  }
}
