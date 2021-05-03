import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  buttons: any;
  selectedButton: any;
  selectedButtonId: any;

  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    // fetch button type
    this.customizeService.getButton().subscribe((res: any) => {
        this.buttons = res.data;

        // fetch selected fabric type
        let customize: any = localStorage.getItem("customize");
        let parsedData = JSON.parse(customize);
        if(parsedData.button) {
          this.selectedButtonId = JSON.parse(customize).button.id;
          this.selectedButton = this.buttons.find((item: any) => 
          item.id == this.selectedButtonId);  
        }
      });
  }

  // Select button
  onSelectButton(id: any) {
    this.selectedButton = this.buttons.find((item: any) => item.id == id);
    let storedCustomize: any = localStorage.getItem("customize");
    let customize = JSON.parse(storedCustomize);
    customize.button = this.selectedButton;
    localStorage.setItem('customize', JSON.stringify(customize));
  }

}
