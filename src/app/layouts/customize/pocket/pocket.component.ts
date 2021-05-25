import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss']
})
export class PocketComponent implements OnInit {
  pockets: any;
  selectedPocket: any;
  selectedPocketId: any;

  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    // fetch pocket type
    this.customizeService.getPocket().subscribe((res: any) => {
        this.pockets = res.data;

         // fetch selected fabric type
         let customize: any = localStorage.getItem("customize");
         let parsedData = JSON.parse(customize);
         if(parsedData.pocket) {
          this.selectedPocketId = parsedData.pocket.id;
          this.selectedPocket = this.pockets.find((item: any) => 
          item.id == this.selectedPocketId);  
        }
      });
  }

  // Select pocket
  onSelectPocket(id: any) {
    this.selectedPocket = this.pockets.find((item: any) => item.id == id);
    let storedCustomize: any = localStorage.getItem("customize");
    let customize = JSON.parse(storedCustomize);
    customize.pocket = this.selectedPocket;
    this.customizeService.thobe.next(customize);
    localStorage.setItem('customize', JSON.stringify(customize));
  }

}
