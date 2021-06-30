import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutUs: any;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.aboutUs().subscribe((res: any) => {
      this.aboutUs = res.data;
    })
  }

}
