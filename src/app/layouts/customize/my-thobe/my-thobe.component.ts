import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-thobe',
  templateUrl: './my-thobe.component.html',
  styleUrls: ['./my-thobe.component.scss']
})
export class MyThobeComponent implements OnInit {
  storedCustomize: any;
  customize: any;

  constructor() {}

  ngOnInit(): void {
    this.storedCustomize = localStorage.getItem("customize");
    this.customize = JSON.parse(this.storedCustomize);
  }

}
