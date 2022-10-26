import {Component, Injectable, OnInit} from '@angular/core';
import {DonationService} from "../service/DonationService";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {Student} from "../model/Student";
import {Donor} from "../model/Donor";
import {Address} from "../model/Address";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  student = new Student(0,'','','','',false);
  donor = new Donor(0, '', '', '', '');
  address = new Address(0,'','',0);
  error = "";
  success = "";
  loginModel = { email: "", password: "", accountType: ""};
  regModel = { type: "", firstname: "", lastname: "", email: "",
    password: "", confirm: "", code: 0, streetname: "", streetnumber: ""}

  constructor(private service: DonationService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.cookieService.set( 'donor', '' );
    this.cookieService.set( 'student', '' );
  }

  public login(form: NgForm): void {
    if(this.loginModel.accountType && this.loginModel.email && this.loginModel.password){
      this.loginModel.accountType == 'donor' ? this.loginDonor() : this.loginStudent();
    }
    form.resetForm();
  }

  private loginDonor(){
    this.service.loginDonor(this.loginModel.email, this.loginModel.password).subscribe(
      (res: Donor) => {
        if(res.id > 0){
          this.cookieService.set( 'donor', res.id.toString());
          this.router.navigateByUrl('/donor');
        }
      },
      (error: HttpErrorResponse) => {
        alert("Could NOT log donor in.");
      }
    );
  }

  private loginStudent(){
    this.service.loginStudent(this.loginModel.email, this.loginModel.password).subscribe(
      (res: Student) => {
        if(res.id > 0){
          this.cookieService.set( 'student', res.id.toString());
          this.router.navigateByUrl('/student');
        }
      },
      (error: HttpErrorResponse) => {
        alert("Could NOT log student in.");
      }
    );
  }

  isValidUser(): boolean{
    if(this.regModel.type == "" || this.regModel.firstname == "" || this.regModel.lastname == ""
      || this.regModel.email =="" || this.regModel.password == "" || this.regModel.confirm == ""
      || this.regModel.streetname == "" || this.regModel.streetnumber =="")
      return false;
    return true;
  }

  register(){
    this.success = '';
    this.error = '';
    if(!this.regModel.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")){
      this.error = "Invalid email format";
      return;
    }
    if(this.regModel.password != this.regModel.confirm){
      this.error = "Password does not match";
      return;
    }
    if(!this.regModel.email.includes("@")){
      this.error = "Invalid email";
      return;
    }
    if(!this.regModel.code || this.regModel.code < 1){
      this.error = "Invalid postal code";
      return;
    }
    this.regModel.type == "donor" ? this.addDonor() : this.addStudent();
  }

  addStudent(){
    this.student.email = this.regModel.email;
    this.student.lastName = this.regModel.lastname;
    this.student.firstName = this.regModel.firstname;
    this.student.password = this.regModel.password;
    this.service.saveStudent(this.student).subscribe(
      (res: Student) => {
        this.address.id =res.id;
        this.addAddress();
        this.success = "Registered successfully"
      },
      (err: HttpErrorResponse) =>{
        this.error = "User NOT registered, Please try again or contact Prof. O. Ndlebe";
      }
    );
  }

  addDonor(){
    this.donor.email = this.regModel.email;
    this.donor.lastName = this.regModel.lastname;
    this.donor.firstName = this.regModel.firstname;
    this.donor.password = this.regModel.password;
    this.service.saveDonor(this.donor).subscribe(
      (res: Donor) => {
        this.address.id = res.id;
        this.addAddress();
        this.success = "Registered successfully"
      },
      (err: HttpErrorResponse) =>{
        this.error = "User NOT registered, Please try again or contact Prof. O. Ndlebe";
      }
    );
  }

  addAddress(){
    this.address.streetNumber = this.regModel.streetnumber;
    this.address.streetName = this.regModel.streetname;
    this.address.postalCode = this.regModel.code;
    this.service.saveAddress(this.address).subscribe(
      (res: Address) => {
      },
      (err: HttpErrorResponse) =>{
        this.error = "User Address NOT saved, Please try again or contact Prof. O. Ndlebe";
      }
    );
  }

}
