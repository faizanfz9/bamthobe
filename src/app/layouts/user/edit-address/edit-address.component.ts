import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/services/user.service';
import {AgmMap,MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  address: any;
  addressId: any;
  getAddress: any;

  lat = 51.678418;
  lng = 7.809007;
  currentLocation: any;
  @ViewChild(AgmMap,{static: true}) public agmMap: any;  

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private apiloader: MapsAPILoader,
    private router: Router) { }

  ngOnInit(): void {
    // fetch selected address
    this.addressId = this.route.snapshot.params.id;
    this.userService.getAddress().subscribe((res: any) => {
      this.address = res.data.filter((item: any) => item.id == this.addressId)[0];
    })
  }

  // on Update address
  onUpdateAddress(form: NgForm) {
    let address = new FormData();
    address.append('name', form.value.name);
    address.append('address', form.value.address);
    address.append('home_type', form.value.addressType);
    address.append('address_id', this.addressId);
    address.append('lat', this.lat.toString());
    address.append('lng', this.lng.toString());

    this.spinner.show();
    this.userService.updateAddress(address).subscribe((res: any) => {
      this.spinner.hide();
      alert(res.message);
      this.router.navigate(['/my-account/address-book']);
    }, error => {
      this.spinner.hide();
    })
    
  }

  getCurrentLocation() {  
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition((position: any) => {  
            if (position) {  
                this.lat = position.coords.latitude;  
                this.lng = position.coords.longitude;  
                this.convertToAddress(this.lat, this.lng);
            }  
        })  
      }  
    } 

  convertToAddress(lat: any, lan: any) {
    this.getAddress = (this.lat, this.lng)  
    this.apiloader.load().then(() => {  
        let geocoder = new google.maps.Geocoder;  
        let latlng = {  
            lat: this.lat,  
            lng: this.lng  
        };  
        geocoder.geocode({  
            'location': latlng  
        }, (results: any) => {  
            if (results[0]) {  
                this.currentLocation = results[0].formatted_address;  
                this.address.address = this.currentLocation;
            } else {  
                console.log('Not found');  
            }  
        });  
    });  
  }  

  onChooseLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.convertToAddress(this.lat, this.lng);
  }
}
