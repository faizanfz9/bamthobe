import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { HeaderComponent } from './layouts/include/header/header.component';
import { FooterComponent } from './layouts/include/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { FeatureBlockComponent } from './layouts/home/feature-block/feature-block.component';
import { PrivacyPolicyComponent } from './layouts/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './layouts/terms-and-condition/terms-and-condition.component';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { FaqsComponent } from './layouts/faqs/faqs.component';
import { CustomizeComponent } from './layouts/customize/customize.component';
import { FabricComponent } from './layouts/customize/fabric/fabric.component';
import { CollarComponent } from './layouts/customize/collar/collar.component';
import { CuffsComponent } from './layouts/customize/cuffs/cuffs.component';
import { PocketComponent } from './layouts/customize/pocket/pocket.component';
import { PlacketComponent } from './layouts/customize/placket/placket.component';
import { ButtonComponent } from './layouts/customize/button/button.component';
import { SidePocketComponent } from './layouts/customize/side-pocket/side-pocket.component';
import { MeasurementComponent } from './layouts/customize/measurement/measurement.component';
import { EnterDetailsComponent } from './layouts/customize/enter-details/enter-details.component';
import { MyThobeComponent } from './layouts/customize/my-thobe/my-thobe.component';
import { MyCartComponent } from './layouts/my-cart/my-cart.component';
import { CheckoutComponent } from './layouts/checkout/checkout.component';
import { PaymentComponent } from './layouts/payment/payment.component';
import { ThankYouComponent } from './layouts/thank-you/thank-you.component';
import { MyProfileComponent } from './layouts/user/my-profile/my-profile.component';
import { AddressBookComponent } from './layouts/user/address-book/address-book.component';
import { MeasurementsComponent } from './layouts/user/measurements/measurements.component';
import { OrdersComponent } from './layouts/user/orders/orders.component';
import { AppointmentsComponent } from './layouts/user/appointments/appointments.component';
import { LoyalityPointsComponent } from './layouts/user/loyality-points/loyality-points.component';
import { GiftCardComponent } from './layouts/user/gift-card/gift-card.component';
import { OffersComponent } from './layouts/user/offers/offers.component';
import { SettingsComponent } from './layouts/user/settings/settings.component';
import { UserComponent } from './layouts/user/user.component';
import { AddNewAddressComponent } from './layouts/user/add-new-address/add-new-address.component';
import { TrackComponent } from './layouts/user/track/track.component';
import { RegisterComponent } from './layouts/modals/register/register.component';
import { LoginComponent } from './layouts/modals/login/login.component';
import { VerifyComponent } from './layouts/modals/verify/verify.component';
import { ForgotPwdComponent } from './layouts/modals/forgot-pwd/forgot-pwd.component';
import { ChangePwdComponent } from './layouts/modals/change-pwd/change-pwd.component';
import { ProductsComponent } from './layouts/products/products.component';
import { ProductDetailComponent } from './layouts/product-detail/product-detail.component';
import { InterceptorService } from './shared/services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    FeatureBlockComponent,
    PrivacyPolicyComponent,
    TermsAndConditionComponent,
    ContactUsComponent,
    FaqsComponent,
    CustomizeComponent,
    FabricComponent,
    CollarComponent,
    CuffsComponent,
    PocketComponent,
    PlacketComponent,
    ButtonComponent,
    SidePocketComponent,
    MeasurementComponent,
    EnterDetailsComponent,
    MyThobeComponent,
    MyCartComponent,
    CheckoutComponent,
    PaymentComponent,
    ThankYouComponent,
    UserComponent,
    MyProfileComponent,
    AddressBookComponent,
    MeasurementsComponent,
    OrdersComponent,
    AppointmentsComponent,
    LoyalityPointsComponent,
    GiftCardComponent,
    OffersComponent,
    SettingsComponent,
    AddNewAddressComponent,
    TrackComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    ForgotPwdComponent,
    ChangePwdComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
