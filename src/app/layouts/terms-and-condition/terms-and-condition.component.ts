import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {
  termsAndCondition: any;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.privacyPolicy().subscribe((res: any) => {
      this.termsAndCondition = res.data;
    })
  }

}
