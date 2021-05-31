import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  summerFabrics: any;
  winterFabrics: any;
  fabrics: any;
  selectedFabric: any = null;
  selectedFabricId: any;
  isLogin = false;
  active = 1;

  constructor(private customizeService: CustomizeService) { 
  }

  ngOnInit(): void {
    // fetch fabric type list
    this.customizeService.getFabric().subscribe((res: any) => {
      this.fabrics = res.data;
      this.summerFabrics = this.fabrics.filter((item: any) => item.type == 'Summer');
      this.winterFabrics = this.fabrics.filter((item: any) => item.type == 'Winter');

        // fetch selected fabric type
      let customize: any = localStorage.getItem("customize");
      let parsedData = customize ? JSON.parse(customize) : {};
      if(parsedData.fabric) {
        this.selectedFabricId = parsedData.fabric.id;
        this.selectedFabric = this.fabrics.find((item: any) => 
        item.id == this.selectedFabricId);  
        console.log(this.selectedFabricId);
      }
    });
  }

  // Select fabric
  onSelectFabric(id: any): any {
    this.selectedFabric = this.fabrics.find((item: any) => item.id == id);
    this.selectedFabricId = this.selectedFabric.id;
    let customize: any = { fabric: this.selectedFabric, totalPrice: this.selectedFabric.price }; 
    this.customizeService.thobe.next(customize);
    localStorage.setItem('customize', JSON.stringify(customize));
  }

  choosedSummerFabric() {
    if(this.summerFabrics) {
      return this.summerFabrics.some((item: any) => item.id == this.selectedFabricId);
    }else {
      return false;
    }
  }

  choosedWinterFabric() {
    if(this.winterFabrics) {
      return this.winterFabrics.some((item: any) => item.id == this.selectedFabricId);
    }else {
      return false;
    }
  }
}

