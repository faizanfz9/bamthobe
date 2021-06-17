import { AfterViewInit, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { DOCUMENT } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomizeComponent implements OnInit, AfterViewInit {
  // filter: any;
  pattern: any;
  collar: any;
  cuff: any;
  pocket: any;
  placket: any;
  model: any;
  totalPrice = 0;
  isFiltered = false;
  
  constructor(private customizeService: CustomizeService, 
    private spinner: NgxSpinnerService,
    @Inject(DOCUMENT) private document: Document) { 
  }

  ngOnInit(): void {
     // fetch selected fabric type
     let customize: any = localStorage.getItem("customize");
     let parsedData = customize ? JSON.parse(customize) : null;
     if(parsedData) {
      //  this.filter = parsedData.fabric ? generateFilter(parsedData.fabric.color_code.replace("#","")) : null;
       this.pattern = parsedData.fabric ? parsedData.fabric.image : null;
       this.collar = parsedData.collar ? parsedData.collar.visible_image : null;
       this.cuff = parsedData.cuff ? parsedData.cuff.visible_image : null;
       this.pocket = parsedData.pocket ? parsedData.pocket.visible_image : null;
       this.placket = parsedData.placket ? parsedData.placket.visible_image : null;

       this.totalPrice = parsedData.totalPrice;
       if(parsedData.fabric.price ==  0) {
        this.isFiltered = false;
       }else {
        this.isFiltered = true;
       }
     }
     
    this.customizeService.thobe.subscribe((res: any) => {
      if(res) {
        // this.filter = res.fabric.color_code ? generateFilter(res.fabric.color_code.replace("#","")) : null;
        this.pattern = res.fabric ? res.fabric.image : null;
        this.collar = res.collar ? res.collar.visible_image : null;
        this.cuff = res.cuff ? res.cuff.visible_image : null;
        this.pocket = res.pocket ? res.pocket.visible_image : null;
        this.placket = res.placket ? res.placket.visible_image : null;

        this.totalPrice = res.totalPrice;
        if(res.fabric.price ==  0) {
          this.isFiltered = false;
        }else {
          this.isFiltered = true;
        }
        this.applyFilter();
      }
    })

    this.spinner.show();
    this.customizeService.getModel().subscribe((res: any) => {
      this.spinner.hide();
      this.model = res.data[0].image;
       this.applyFilter();
    })
  }

  ngAfterViewInit() {
  }

  applyFilter() {
    var filterd = this.isFiltered;

    var canvas: any = this.document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

      var model = new Image();
      var collar = new Image();
      var cuff = new Image();
      var placket = new Image();
      var pocket = new Image();
      var img = new Image();

      var collarImg = this.collar ? this.collar :  "/assets/images/thobe-model/collar_front.png";
      var cuffImg = this.cuff ? this.cuff :  "/assets/images/thobe-model/cuff_front.png";
      var placketImg = this.placket ? this.placket :  "/assets/images/thobe-model/placket.png";
      var pocketImg = this.pocket ? this.pocket :  "/assets/images/thobe-model/pocket_single.png";
      var modelImg = this.model;

      img.onload = () => {
        model.src = modelImg;

        collar.src = collarImg;
        cuff.src = cuffImg;
        placket.src = placketImg;
        pocket.src = pocketImg;
        var images = [model, collar, cuff, placket, pocket];
        var imageCount = images.length;
        var imagesLoaded = 0;
        
        for(var i=0; i<imageCount; i++){
          images[i].onload = () => {
              imagesLoaded++;
              if(imagesLoaded == imageCount){
                start();
              }
          }
        }  
      }
      img.src = this.pattern ? this.pattern : collarImg;

      function start() {
          ctx.drawImage(model, 0, 0);

          if(filterd) {
            ctx.globalCompositeOperation = "source-atop";
            var pattern = ctx.createPattern(img, 'repeat');
            ctx.fillStyle = pattern;
            
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fill();

            ctx.globalAlpha = 0.50;
          }
          ctx.drawImage(collar, 0, 0);
          ctx.drawImage(cuff, 0, 0);
          ctx.drawImage(placket, 0, 0);
          ctx.drawImage(pocket, 0, 0);
      }
  }

}
