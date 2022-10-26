import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DonorComponent } from "./donor/donor.component";
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import {MatListModule} from "@angular/material/list";
import {CookieService} from "ngx-cookie-service";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {StudentRecordComponent} from "./student/student-record/student-record.component";
import {DonorDonationComponent} from "./donor/donor-donation/donor-donation.component";

@NgModule({
  declarations: [
    AppComponent, DonorComponent, StudentComponent, LoginComponent, StudentRecordComponent, DonorDonationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatButtonModule,
        HttpClientModule,
        FormsModule,
        MatListModule,
        MatTableModule,
        MatSelectModule
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
