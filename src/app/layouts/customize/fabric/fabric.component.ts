import { Component, OnInit } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';

//     var img1=new Image();
//     var img=new Image();
//     img.onload=function(){

//         img1.onload=function(){
//             start();
//         }
//         img1.src="https://dl.dropboxusercontent.com/u/139992952/stackoverflow/4jiSz1.png";
//     }
//     img.src="https://dl.dropboxusercontent.com/u/139992952/stackoverflow/BooMu1.png";

//     function start(){

//         ctx.drawImage(img1,0,0);

//         ctx.globalCompositeOperation="source-atop";

//         ctx.globalAlpha=.85;

//         var pattern = ctx.createPattern(img, 'repeat');
//         ctx.rect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = pattern;
//         ctx.fill();

//         ctx.globalAlpha=.15;
//         ctx.drawImage(img1,0,0);
//         ctx.drawImage(img1,0,0);

//     }

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  fabrics: any;
  selectedFabric: any = null;
  selectedFabricId: any;

  constructor(private customizeService: CustomizeService) { }

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
