import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  address: any;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    // fetch selected address
    let id = this.route.snapshot.params.id;
    this.userService.getAddress().subscribe((res: any) => {
      this.address = res.data.filter((item: any) => item.id == id)[0];
    })
  }

  // on Update address
  onUpdateAddress(form: NgForm) {
    let address = new FormData();
    address.append('name', form.value.name);
    address.append('address', form.value.address);
    address.append('home_type', form.value.addressType);

    this.spinner.show();
    this.userService.updateAddress(address).subscribe((res: any) => {
      this.spinner.hide();
      alert(res.message);
      this.router.navigate(['/my-account/address-book']);
    }, error => {
      this.spinner.hide();
    })
    
  }
}
