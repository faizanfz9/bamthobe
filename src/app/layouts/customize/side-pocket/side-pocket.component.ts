import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-side-pocket',
  templateUrl: './side-pocket.component.html',
  styleUrls: ['./side-pocket.component.scss']
})
export class SidePocketComponent implements OnInit {
  pocketSide = [
    {
      id: 0,
      value: 'One Side SAR 20',
      price: 20
    },
    {
      id: 1,
      value: 'Both Side SAR 35',
      price: 35
    }
  ];
  pocketDirection = [
    {
      id: 0,
      value: 'Left'
    },
    {
      id: 1,
      value: 'Right'
    }
  ];
  selectedSideId: any;
  selectedDirectionId: any;
  storedCustomize: any;
  customize: any;
  selected: any = false;

  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    // fetch selected side and direction
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
    if(this.customize.pocketSide) {
      this.selectedSideId = this.customize.pocketSide.id;
      this.selected = true;
    }
    if(this.customize.pocketDirection){
      this.selectedDirectionId = this.customize.pocketDirection.id; 
      this.selected = true;
    }
  }

  // Select coin pocket
  onSelectCoinPocket(side: any) {
    this.customize.pocketSide = side;
    this.customize.totalPrice = this.customize.fabric.price + this.customize.collar.price
    + this.customize.cuff.price + this.customize.pocket.price + 
    this.customize.placket.price + this.customize.button.price + side.price; 
    this.customizeService.thobe.next(this.customize);
    localStorage.setItem('customize', JSON.stringify(this.customize));
    this.selectedSideId = side.id;
    if(this.selectedSideId == 1) {
      this.selected = true;
      this.selectedDirectionId = null;
    }else {
      this.selected = false;
    }
  }

  // Select side pocket
  onSelectSidePocket(direction: any) {
    this.customize.pocketDirection = direction;
    localStorage.setItem('customize', JSON.stringify(this.customize));
    this.selectedDirectionId = direction.id;
    this.selected = true;
  }
}
