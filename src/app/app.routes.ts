import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {AboutUsComponent} from "./public/pages/about-us/about-us.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {SportSpacesComponent} from './business/pages/sport-spaces/sport-spaces.component';
import {LoginComponent} from "./iam/pages/login/login.component";
import {RegisterComponent} from "./iam/pages/register/register.component";
import {ProfileComponent} from "./business/components/profile/profile.component";
import {SubscriptionComponent} from "./business/components/subscription/subscription.component";
import {PaymentComponent} from "./business/components/payment/payment.component";
import {SportSpaceDetailComponent} from "./business/components/sport-space-detail/sport-space-detail.component";
import {AuthGuard} from "./iam/services/auth.guard";
import {ReservationComponent} from "./business/components/reservation/reservation.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sport-spaces', component: SportSpacesComponent},
  {path: 'sport-spaces/:id', component: SportSpaceDetailComponent, canActivate: [AuthGuard] },
  {path: 'about-us', component: AboutUsComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'subscriptions', component: SubscriptionComponent, canActivate: [AuthGuard]},
  {path: 'payments', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'reservations', component: ReservationComponent, canActivate: [AuthGuard]},
  {path: '**', component:PageNotFoundComponent}
];
