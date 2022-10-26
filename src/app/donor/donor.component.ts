import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {DonationService} from "../service/DonationService";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Parcel} from "../model/Parcel";
import { Donation } from "../model/Donation";
import {CookieService} from "ngx-cookie-service";
import {Donor} from "../model/Donor";

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})

export class DonorComponent implements OnInit{
  user = new Donor(0,'','','','');
  donationModel = {id: 0, donorId: 0, details: '', donationType: ''};
  parcelModel = {id: 0, description: '', date: '', type: '', status: false};

  constructor(private service: DonationService, private router: Router,  private cookieService: CookieService) { }

  ngOnInit(): void {
    if(Number(this.cookieService.get('donor')) < 1){
      alert("unauthorized access!!!");
      this.router.navigateByUrl('/login');
    }
    else{
      this.getUser(Number(this.cookieService.get('donor')));
    }
  }

  createDonation(form: NgForm):void{
    if(this.donationModel.donationType && this.donationModel.details){
      this.donationModel.donorId = this.user.id;
      this.service.saveDonation(this.donationModel).subscribe(
        (res: Donation) => {
          this.donationModel = res;
          this.createParcel();
          form.resetForm();
          alert('Donation created. Thank you for your donation <(*_*)>');
        },
        (error: HttpErrorResponse) => {
          alert("Could NOT save Donation.");
        }
      );
    }
  }

  createParcel():void{
    this.parcelModel.id = this.donationModel.id;
    this.parcelModel.description = this.donationModel.details;
    this.parcelModel.date = new Date().toLocaleDateString();
    this.parcelModel.type = this.donationModel.donationType;
    this.parcelModel.status = true;
    this.donationModel.id = 0;

    this.service.saveParcel(this.parcelModel).subscribe(
      (res: Parcel) => {
      },
      (error: HttpErrorResponse) => {
        alert("Could NOT save Parcel.");
      }
    );
  }

  getUser(id: number): void{
    this.service.findDonor(id).subscribe(
      (res: Donor) => {
        this.user = res;
      },
      (error: HttpErrorResponse) => {
        alert("Could NOT load user info.");
      }
    );
  }

  logout(){
    this.cookieService.set('donor', '');
    this.router.navigateByUrl('/login');
  }

  goToDonations(){
    this.router.navigateByUrl('/donation');
  }

}
