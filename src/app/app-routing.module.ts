import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DonorComponent} from "./donor/donor.component";
import {StudentComponent} from "./student/student.component";
import {LoginComponent} from "./login/login.component";
import {StudentRecordComponent} from "./student/student-record/student-record.component";
import {DonorDonationComponent} from "./donor/donor-donation/donor-donation.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'donor', component: DonorComponent},
  {path: 'donation', component: DonorDonationComponent},
  {path: 'student', component: StudentComponent},
  {path: 'record', component: StudentRecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
