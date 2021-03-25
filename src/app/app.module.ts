import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

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
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
