import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit {

  constructor(private userService: UserService, 
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
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
