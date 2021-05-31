import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { generateFilter } from "colorize-filter";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomizeComponent implements OnInit, AfterViewInit {
  filter: any;
  pattern: any;
  collar: any;
  cuff: any;
  pocket: any;
  placket: any;
  totalPrice = 0;
  isFiltered = false;
  
  constructor(private customizeService: CustomizeService, 
    @Inject(DOCUMENT) private document: Document) { 
  }

  ngOnInit(): void {
     // fetch selected fabric type
     let customize: any = localStorage.getItem("customize");
     let parsedData = customize ? JSON.parse(customize) : null;
     if(parsedData) {
       this.filter = parsedData.fabric ? generateFilter(parsedData.fabric.color_code.replace("#","")) : null;
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
        this.filter = res.fabric.color_code ? generateFilter(res.fabric.color_code.replace("#","")) : null;
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
  }

  ngAfterViewInit() {
    this.applyFilter();
  }

  applyFilter() {
    var filterd = this.isFiltered;

    var canvas: any = this.document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

    var bodyFront = new Image();
      var collar = new Image();
      var cuff = new Image();
      var placket = new Image();
      var pocket = new Image();
      var sleeveFront = new Image();
      var img = new Image();

      var collarImg = this.collar ? this.collar :  "/assets/images/thobe-model/collar_front.png";
      var cuffImg = this.cuff ? this.cuff :  "/assets/images/thobe-model/cuff_front.png";
      var placketImg = this.placket ? this.placket :  "/assets/images/thobe-model/placket.png";
      var pocketImg = this.pocket ? this.pocket :  "/assets/images/thobe-model/pocket_single.png";

      img.onload = function () {
        bodyFront.src = "/assets/images/thobe-model/body_front.png";
        sleeveFront.src = "/assets/images/thobe-model/sleeve_front.png";
        collar.src = collarImg;
        cuff.src = cuffImg;
        placket.src = placketImg;
        pocket.src = pocketImg;
        var images = [bodyFront, collar, cuff, placket, pocket, sleeveFront];
        var imageCount = images.length;
        var imagesLoaded = 0;
        
        for(var i=0; i<imageCount; i++){
          images[i].onload = function(){
              imagesLoaded++;
              if(imagesLoaded == imageCount){
                start();
              }
          }
        }  
      }
      img.src = this.pattern ? this.pattern : collarImg;

      function start() {
          ctx.drawImage(bodyFront, 0, 0);
          ctx.drawImage(sleeveFront, 0, 0);
          ctx.drawImage(collar, 0, 0);
          ctx.drawImage(cuff, 0, 0);
          ctx.drawImage(placket, 0, 0);
          ctx.drawImage(pocket, 0, 0);

          if(filterd) {
            ctx.globalCompositeOperation = "source-atop";
            var pattern = ctx.createPattern(img, 'repeat');
            ctx.fillStyle = pattern;
            
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fill();

            ctx.globalAlpha = 0.50;
            ctx.drawImage(collar, 0, 0);
            ctx.drawImage(cuff, 0, 0);
            ctx.drawImage(placket, 0, 0);
            ctx.drawImage(pocket, 0, 0);
          }
      }
  }

}
