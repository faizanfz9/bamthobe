import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  fabrics: any;
  selectedFabric: any = null;
  selectedFabricId: any;
  @ViewChild("myCanvas") myCanvas: any;

  constructor(private customizeService: CustomizeService) { 
  }

  ngOnInit(): void {
    // fetch fabric type list
    this.customizeService.getFabric().subscribe((res: any) => {
      this.fabrics = res.data;

      // fetch selected fabric type
      let customize: any = localStorage.getItem("customize");
      let parsedData = customize ? JSON.parse(customize) : {};
      if(parsedData.fabric) {
        this.selectedFabricId = parsedData.fabric.id;
        this.selectedFabric = this.fabrics.find((item: any) => 
        item.id == this.selectedFabricId);  
      }
    });
  }

  // Select fabric
  onSelectFabric(id: any) {
    this.selectedFabric = this.fabrics.find((item: any) => item.id == id);
    let customize: any = { fabric: this.selectedFabric, totalPrice: this.selectedFabric.price }; 
    this.customizeService.thobe.next(customize);
    localStorage.setItem('customize', JSON.stringify(customize));
  }
}
