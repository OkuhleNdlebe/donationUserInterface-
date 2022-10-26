import { Component, OnInit } from '@angular/core';
import {DonationService} from "../service/DonationService";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";
import {Student} from "../model/Student";
import {NgForm} from "@angular/forms";
import {ParcelRequest} from "../model/ParcelRequest";
import {Record} from "../model/Record";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  user = new Student(0,'','','','',false);
  parcelRequestModel = {id: 0, date: '', donationType: '',  studentId: 0, isReceived: false};

  constructor(private service: DonationService, private router: Router,  private cookieService: CookieService) { }

  ngOnInit(): void {
    if(Number(this.cookieService.get('student')) < 1){
      alert("unauthorized access!!!");
      this.router.navigateByUrl('/login');
    }else{
      this.getUser(Number(this.cookieService.get('student')));
    }
  }

  getUser(id: number): void{
    this.service.findStudent(id).subscribe(
      (res: Student) => {
        this.user = res;
      },
      (error: HttpErrorResponse) => {
        alert("Could NOT load student info.");
      }
    );
  }

  requestParcel(form: NgForm){
    if(this.parcelRequestModel.donationType){
      this.parcelRequestModel.date = new Date().toLocaleDateString();
      this.parcelRequestModel.studentId = Number(this.cookieService.get('student'));
      this.service.saveParcelRequest(this.parcelRequestModel).subscribe(
        (res: ParcelRequest) => {
          this.parcelRequestModel = res;
          this.parcelRequestModel.id = 0;
          form.resetForm();
          alert('request sent.');
        },
        (error: HttpErrorResponse) => {
          alert("Could NOT save parcel request info.");
        }
      );
    }
  }

  logout(){
    this.cookieService.set('student', '');
    this.router.navigateByUrl('/login');
  }

  goToRecords(){
    this.router.navigateByUrl('/record');
  }

}
