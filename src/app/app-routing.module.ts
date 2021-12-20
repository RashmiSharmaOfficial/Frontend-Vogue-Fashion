import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedComponent } from './components/featured/featured.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryComponent } from './components/category/category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';



const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'payment', component:PaymentComponent},

  {path: 'featured', component:FeaturedComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'category', component:CategoryComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'login', component:LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'register', component:RegisterComponent},

  {path:'**', component:NoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
