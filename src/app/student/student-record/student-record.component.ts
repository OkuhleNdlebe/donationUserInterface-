import {Component, OnInit} from "@angular/core";
import {Record} from "../../model/Record";
import {HttpErrorResponse} from "@angular/common/http";
import {DonationService} from "../../service/DonationService";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Address} from "../../model/Address";

@Component({
  selector: 'app-student-record',
  templateUrl: './student-record.component.html',
  styleUrls: ['./student-record.component.css']
})
export class StudentRecordComponent implements OnInit{

  studentRecords!: Record[];
  address = new Address(0,'','',0);
  displayedColumns: string[] = ['id', 'date', 'type', 'received'];

  constructor(private service: DonationService, private router: Router,  private cookieService: CookieService) { }

  ngOnInit(): void {
    if(Number(this.cookieService.get('student')) < 1){
      alert("unauthorized access!!!");
      this.router.navigateByUrl('/login');
    }else{
      this.getRecords();
      this.getAddress();
    }
  }

  getRecords(){
    console.log('Finding records...')
    this.service.findAllRecords(Number(this.cookieService.get('student'))).subscribe(
      (res: Record[]) => {
        this.studentRecords = res;
      },
      (error: HttpErrorResponse) => {
        alert("Could NOT load student records.");
      }
    );
  }

  getAddress(){
    this.service.findAddress(Number(this.cookieService.get('student'))).subscribe(
      (res: Address) => {
        this.address = res;
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  goToStudent(){
    this.router.navigateByUrl('/student');
  }

}
