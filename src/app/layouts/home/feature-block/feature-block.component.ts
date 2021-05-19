import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-block',
  templateUrl: './feature-block.component.html',
  styleUrls: ['./feature-block.component.scss']
})
export class FeatureBlockComponent implements OnInit {
  isWebView = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      if(res.web) {
        this.isWebView = true;
      }
    });
  }

}
