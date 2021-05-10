import { Component, DoCheck, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from '../../modals/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  showSearchBox = false;
  isLoggedIn: any;
  user: any;
  menuCategories: any;

  constructor(private modalService: NgbModal,
    private userService: UserService, 
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
     // checking user authentication
    this.authService.user.subscribe(res => {
      this.isLoggedIn = res.isLogin;
      this.user = res.data;
    })
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.userService.getLoggedUser();

    // fetching menu category
    this.productService.getProductsCat().subscribe((res: any) => {
      this.menuCategories = res.data.filter((item: any) => item.type == 'normal');
    })
  }

  // Open login modal
  open() {
    this.modalService.open(LoginComponent, { centered: true });
  }

  // do logout
  onLogout() {
    this.spinner.show();
    localStorage.clear();
      this.authService.user.next({isLogin: false, data: null});
      this.router.navigate(['/']);
      this.spinner.hide();
  }

  // Search Proudcts
  onSerachProduct(form: NgForm) {
    this.showSearchBox = false;
    this.router.navigate(['/search'], { queryParams: { query: form.value.search } });
  }

}

