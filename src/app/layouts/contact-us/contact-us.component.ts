import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/shared/services/config.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private configService: ConfigService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSendRequest(form: NgForm) {
    let request = new FormData();
    request.append("name", form.value.name);
    request.append("email", form.value.email);
    request.append("mobile", form.value.phone);
    request.append("message", form.value.message);

    this.spinner.show();
    this.configService.contactRequest(request).subscribe((res: any) => {
      this.spinner.hide();
      alert("We have receive your request!");
    })
  }
}
