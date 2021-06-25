import { AgmMap, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  address: any;
  getAddress: any;

  lat = 51.678418;
  lng = 7.809007;
  currentLocation: any;
  @ViewChild(AgmMap,{static: true}) public agmMap: any;  

  constructor(private userService: UserService, 
    private spinner: NgxSpinnerService,
    private apiloader: MapsAPILoader,
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
    address.append('lat', this.lat.toString());
    address.append('lng', this.lng.toString());

    this.spinner.show();
    this.userService.addAddress(address).subscribe((res: any) => {
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
                this.address = this.currentLocation;
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
