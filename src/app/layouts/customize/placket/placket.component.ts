import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-placket',
  templateUrl: './placket.component.html',
  styleUrls: ['./placket.component.scss']
})
export class PlacketComponent implements OnInit {
  plackets: any;
  selectedPlacket: any;
  selectedPlacketId: any;

  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    // fetch placket type
    this.customizeService.getPlacket().subscribe((res: any) => {
        this.plackets = res.data

        // fetch selected fabric type
        let customize: any = localStorage.getItem("customize");
        let parsedData = JSON.parse(customize);
        if(parsedData.placket) {
          this.selectedPlacketId = parsedData.placket.id;
          this.selectedPlacket = this.plackets.find((item: any) => 
          item.id == this.selectedPlacketId);  
        }
      });
  }

  // Select placket
  onSelectPlacket(id: any) {
    this.selectedPlacket = this.plackets.find((item: any) => item.id == id);
    let storedCustomize: any = localStorage.getItem("customize");
    let customize = JSON.parse(storedCustomize);
    customize.placket = this.selectedPlacket;
    customize.totalPrice = customize.fabric.price + customize.collar.price + 
    customize.cuff.price + customize.pocket.price + this.selectedPlacket.price; 
    this.customizeService.thobe.next(customize);
    localStorage.setItem('customize', JSON.stringify(customize));
  }

}
