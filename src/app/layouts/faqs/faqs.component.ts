import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqsComponent implements OnInit {
  faqs: any

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.faqs().subscribe((res: any) => {
      this.faqs = res.data;
    })
  }

}
