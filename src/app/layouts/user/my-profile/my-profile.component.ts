import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user: any;
  profileImg: any;
  profileImgUrl: any;

  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // Fetch user profile

    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.user = res.data;
        this.profileImgUrl = this.user.image;
        console.log(this.user);
      });
  }

  // update profile pic
  onUpdateDp(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.profileImg = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.profileImgUrl = event.target.result;
        console.log(this.profileImgUrl);
      }
    }
  }

  // edit profile
  onEditProfile(form: NgForm) {
    let user = new FormData();
    user.append('name', form.value.name);
    user.append('email', form.value.email);
    user.append('gender', form.value.gender);
    user.append('image', this.profileImg);

    this.spinner.show();
    this.userService.updateProfile(user).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      alert('Profile updated successfully!');
    }, error => {
      this.spinner.hide();
    })
  }

}
