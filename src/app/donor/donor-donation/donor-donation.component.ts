import {Component, OnInit} from "@angular/core";
import {Donation} from "../../model/Donation";
import {HttpErrorResponse} from "@angular/common/http";
import {DonationService} from "../../service/DonationService";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-donor-donation',
  templateUrl: './donor-donation.component.html',
  styleUrls: ['./donor-donation.component.css']
})
export class DonorDonationComponent implements OnInit{


  userDonations!: Donation[];
  displayedColumns: string[] = ['id', 'donationType', 'details'];

  constructor(private service: DonationService, private router: Router,  private cookieService: CookieService) { }

  ngOnInit(): void {
    if(Number(this.cookieService.get('donor')) < 1){
      alert("unauthorized access!!!");
      this.router.navigateByUrl('/login');
    }
    else{
      this.findUserDonations();
    }
  }

  findUserDonations(): void{
    this.service.findUserDonations(Number(this.cookieService.get('donor'))).subscribe(
      (res: Donation[]) => {
        this.userDonations = res;
      },
      (error: HttpErrorResponse) => {
        alert("Could NOT load user donations.");
      }
    );
  }

  goToDonor(){
    this.router.navigateByUrl('/donor');
  }

}
