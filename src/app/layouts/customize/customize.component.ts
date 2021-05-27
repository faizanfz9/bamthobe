import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { generateFilter } from "colorize-filter";

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomizeComponent implements OnInit {
  filter: any;
  collar: any;
  cuff: any;
  pocket: any;
  placket: any;
  totalPrice = 0;
  
  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
     // fetch selected fabric type
     let customize: any = localStorage.getItem("customize");
     let parsedData = customize ? JSON.parse(customize) : {};
     if(parsedData) {
       this.filter = parsedData.fabric ? generateFilter(parsedData.fabric.color_code.replace("#","")) : null;
       this.collar = parsedData.collar ? parsedData.collar.visible_image : null;
       this.cuff = parsedData.cuff ? parsedData.cuff.visible_image : null;
       this.pocket = parsedData.pocket ? parsedData.pocket.visible_image : null;
       this.placket = parsedData.placket ? parsedData.placket.visible_image : null;

       this.totalPrice = parsedData.totalPrice;
     }
     
    this.customizeService.thobe.subscribe((res: any) => {
      if(res) {
        this.filter = res.fabric.color_code ? generateFilter(res.fabric.color_code.replace("#","")) : null;
        this.collar = res.collar ? res.collar.visible_image : null;
        this.cuff = res.cuff ? res.cuff.visible_image : null;
        this.pocket = res.pocket ? res.pocket.visible_image : null;
        this.placket = res.placket ? res.placket.visible_image : null;

        this.totalPrice = res.totalPrice;
      }
    })
  }

}
