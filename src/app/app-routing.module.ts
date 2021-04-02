import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { CheckoutComponent } from './layouts/checkout/checkout.component';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { ButtonComponent } from './layouts/customize/button/button.component';
import { CollarComponent } from './layouts/customize/collar/collar.component';
import { CuffsComponent } from './layouts/customize/cuffs/cuffs.component';
import { CustomizeComponent } from './layouts/customize/customize.component';
import { EnterDetailsComponent } from './layouts/customize/enter-details/enter-details.component';
import { FabricComponent } from './layouts/customize/fabric/fabric.component';
import { MeasurementComponent } from './layouts/customize/measurement/measurement.component';
import { MyThobeComponent } from './layouts/customize/my-thobe/my-thobe.component';
import { PlacketComponent } from './layouts/customize/placket/placket.component';
import { PocketComponent } from './layouts/customize/pocket/pocket.component';
import { SidePocketComponent } from './layouts/customize/side-pocket/side-pocket.component';
import { FaqsComponent } from './layouts/faqs/faqs.component';
import { HomeComponent } from './layouts/home/home.component';
import { MyCartComponent } from './layouts/my-cart/my-cart.component';
import { PaymentComponent } from './layouts/payment/payment.component';
import { PrivacyPolicyComponent } from './layouts/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './layouts/terms-and-condition/terms-and-condition.component';
import { ThankYouComponent } from './layouts/thank-you/thank-you.component';
import { AddNewAddressComponent } from './layouts/user/add-new-address/add-new-address.component';
import { AddressBookComponent } from './layouts/user/address-book/address-book.component';
import { AppointmentsComponent } from './layouts/user/appointments/appointments.component';
import { LoyalityPointsComponent } from './layouts/user/loyality-points/loyality-points.component';
import { MeasurementsComponent } from './layouts/user/measurements/measurements.component';
import { MyProfileComponent } from './layouts/user/my-profile/my-profile.component';
import { OrdersComponent } from './layouts/user/orders/orders.component';
import { TrackComponent } from './layouts/user/track/track.component';
import { UserComponent } from './layouts/user/user.component';

const routes: Routes = [
  {path: "", pathMatch: "full", component: HomeComponent},
  {path: "about-us", component: AboutUsComponent},
  {path: "privacy-policy", component: PrivacyPolicyComponent},
  {path: "terms-and-condition", component: TermsAndConditionComponent},
  {path: "contact-us", component: ContactUsComponent},
  {path: "faqs", component: FaqsComponent},
  {path: "customize", component: CustomizeComponent, children : [
    {path: "fabric", component: FabricComponent},
    {path: "collar", component: CollarComponent},
    {path: "cuffs", component: CuffsComponent},
    {path: "pocket", component: PocketComponent},
    {path: "placket", component: PlacketComponent},
    {path: "button", component: ButtonComponent},
    {path: "side-pocket", component: SidePocketComponent},
    {path: "measurement", component: MeasurementComponent},
    {path: "enter-details", component: EnterDetailsComponent},
    {path: "my-thobe", component: MyThobeComponent},
  ]},
  {path: "my-cart", component: MyCartComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "payment", component: PaymentComponent},
  {path: "thank-you", component: ThankYouComponent},
  {path: "user", component: UserComponent, children: [
    {path: "my-profile", component: MyProfileComponent},
    {path: "address-book", component: AddressBookComponent},
    {path: "add-new-address", component: AddNewAddressComponent},
    {path: "orders", component: OrdersComponent},
    {path: "track", component: TrackComponent},
    {path: "measurement", component: MeasurementsComponent},
    {path: "appointments", component: AppointmentsComponent},
    {path: "loyality-points", component: LoyalityPointsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
