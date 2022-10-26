import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Donation} from "../model/Donation";
import {Parcel} from "../model/Parcel";
import {Donor} from "../model/Donor";
import {Student} from "../model/Student";
import {Address} from "../model/Address";
import {ParcelRequest} from "../model/ParcelRequest";
import {Record} from "../model/Record";

@Injectable({
  providedIn: "root"
})
export class DonationService{

  private baseUrl = "http://localhost:8080/auth";
  private baseNoAuthUrl = "http://localhost:8080/user";

  private username = 'azzo';
  private password = 'athi';
   headers = new HttpHeaders({Authorization: 'Basic '+btoa(this.username+':'+this.password)});

  constructor(private http: HttpClient) { }

  public loginDonor(email: string, password: string): Observable<Donor> {
    return this.http.get<Donor>(`${this.baseNoAuthUrl}/login/donor/${email}/${password}`);
  }

  public loginStudent(email: string, password: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseNoAuthUrl}/login/student/${email}/${password}`);
  }

  public saveDonor(donor: Donor): Observable<Donor> {
    return this.http.post<Donor>(`${this.baseNoAuthUrl}/save/donor`, donor);
  }

  public saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseNoAuthUrl}/save/student`, student);
  }

  public saveAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseNoAuthUrl}/save/address`, address);
  }

  public saveDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.baseUrl}/donation/save`, donation, {headers:this.headers, responseType:'json'});
  }

  public saveParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.post<Parcel>(`${this.baseUrl}/parcel/save`, parcel, {headers:this.headers, responseType:'json'});
  }

  public saveParcelRequest(parcelRequest: ParcelRequest): Observable<ParcelRequest> {
    return this.http.post<ParcelRequest>(`${this.baseUrl}/request/save`, parcelRequest, {headers:this.headers, responseType:'json'});
  }

  public findAllRecords(id: number): Observable<Record[]> {
    return this.http.get<Record[]>(`${this.baseUrl}/record/find-by/${id}`, {headers:this.headers, responseType:'json'});
  }

  public findAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/address/find-id/${id}`, {headers:this.headers, responseType:'json'});
  }

  public findDonor(id: number): Observable<Donor> {
    return this.http.get<Donor>(`${this.baseUrl}/donor/find/${id}`, {headers:this.headers, responseType:'json'});
  }

  public findStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/student/find/${id}`, {headers:this.headers, responseType:'json'});
  }

  public findUserDonations(id: number): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.baseUrl}/donation/find-by/donor/${id}`, {headers:this.headers, responseType:'json'});
  }

}

