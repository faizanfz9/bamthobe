import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyPolicy: any;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.privacyPolicy().subscribe((res: any) => {
      this.privacyPolicy = res.data;
    })
  }

}
