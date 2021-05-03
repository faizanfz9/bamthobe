import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-collar',
  templateUrl: './collar.component.html',
  styleUrls: ['./collar.component.scss']
})
export class CollarComponent implements OnInit {
  collars: any;
  selectedCollar: any;
  selectedCollarId: any;

  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    // fetch collar type
    this.customizeService.getCollar().subscribe((res: any) => {
        this.collars = res.data

        // fetch selected fabric type
        let customize: any = localStorage.getItem("customize");
        let parsedData = JSON.parse(customize);
        if(parsedData.collar) {
          this.selectedCollarId = parsedData.collar.id;
          this.selectedCollar = this.collars.find((item: any) => 
          item.id == this.selectedCollarId);  
        }
      });
  }

  // Select collar
  onSelectCollar(id: any) {
    this.selectedCollar = this.collars.find((item: any) => item.id == id);
    let storedCustomize: any = localStorage.getItem("customize");
    let customize = JSON.parse(storedCustomize);
    customize.collar = this.selectedCollar;
    localStorage.setItem('customize', JSON.stringify(customize));
  }

}
