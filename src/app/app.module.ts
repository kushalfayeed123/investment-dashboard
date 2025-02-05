import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { DepositComponent } from "./components/deposit/deposit.component";
import { WithdrawComponent } from "./components/withdraw/withdraw.component";
import { InvestmentService } from "./investment.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    DepositComponent,
    WithdrawComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [InvestmentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
