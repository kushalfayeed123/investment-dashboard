import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { DepositComponent } from "./components/deposit/deposit.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { WithdrawComponent } from "./components/withdraw/withdraw.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: UserDashboardComponent },
  { path: "deposit", component: DepositComponent },
  { path: "withdraw", component: WithdrawComponent },
  { path: "admin", component: AdminDashboardComponent },
  { path: "user-details/:uid", component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
