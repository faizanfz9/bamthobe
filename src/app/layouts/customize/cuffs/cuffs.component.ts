import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-cuffs',
  templateUrl: './cuffs.component.html',
  styleUrls: ['./cuffs.component.scss']
})
export class CuffsComponent implements OnInit {
  cuffs: any;
  selectedCuff: any;
  selectedCuffId: any;

  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    // fetch cuff type
    this.customizeService.getCuff().subscribe((res: any) =>{
        this.cuffs = res.data;

        // fetch selected fabric type
        let customize: any = localStorage.getItem("customize");
        let parsedData = JSON.parse(customize);
        if(parsedData.cuff) {
          this.selectedCuffId = parsedData.cuff.id;
          this.selectedCuff = this.cuffs.find((item: any) => 
          item.id == this.selectedCuffId);  
        }
      });
  }

  // Select cuff
  onSelectCuff(id: any) {
    this.selectedCuff = this.cuffs.find((item: any) => item.id == id);
    let storedCustomize: any = localStorage.getItem("customize");
    let customize = JSON.parse(storedCustomize);
    customize.cuff = this.selectedCuff;
    customize.totalPrice = customize.collar.price + customize.fabric.price + this.selectedCuff.price; 
    this.customizeService.thobe.next(customize);
    localStorage.setItem('customize', JSON.stringify(customize));
  }

}
