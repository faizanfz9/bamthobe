import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-my-thobe',
  templateUrl: './my-thobe.component.html',
  styleUrls: ['./my-thobe.component.scss']
})
export class MyThobeComponent implements OnInit {
  storedCustomize: any;
  customize: any;

  constructor(private customizeService: CustomizeService, 
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
  }

  onAddToCart() {
    let thobe = new FormData();
    thobe.append('fabric', this.customize.fabric.id);
    thobe.append('collar', this.customize.collar.id);
    thobe.append('cuffs', this.customize.cuff.id);
    thobe.append('pocket', this.customize.pocket.id);
    thobe.append('placket', this.customize.placket.id);
    thobe.append('button', this.customize.button.id);
    thobe.append('side_pocket', this.customize.pocketSide.id);
    thobe.append('side_pocket_2', this.customize.pocketDirection.id);
    thobe.append('measurement_type', this.customize.measureType.id);
    if(this.customize.measurement_type == 0) {
      thobe.append('name', this.customize.appointment.name);
      thobe.append('mobile', this.customize.appointment.phone);
      thobe.append('date', this.customize.appointment.date);
      thobe.append('branch', this.customize.appointment.branch);
    }

    this.spinner.show();
    this.customizeService.addToCart(thobe).subscribe(res => {
      this.spinner.hide();
      this.customize = null;
      localStorage.removeItem("customize");
      this.router.navigate(['/my-cart']);
    }, error => {
      this.spinner.hide();
    })
  }
}
