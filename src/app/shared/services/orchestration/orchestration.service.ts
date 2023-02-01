import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrchestrationService {
GetbookkUrl='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/latest?userId=15083';
GetTrending='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/trending?userId=15083';
Getbanner='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/banner';
    
  constructor(
    private http: HttpClient
  ) { }

  getBanner() {
    return this.http.get<any>("assets/banners.json"); // replace these path with url's eg: https://domain.com/orchservice/?menuName=banner
    // const url =this.Getbanner;
    // return this.http.get(url)
  }


  getTrending() {
    //  const url = this.GetTrending;
    // return this.http.get(url);
    return this.http.get<any>("assets/trending.json");
  }

  getLatest() {
    // const url = this.GetbookkUrl;
    // return this.http.get(url);
    return this.http.get<any>("assets/latest.json");

  }

  getBooks() {
    return this.http.get<any>("assets/books.json");
  }
}
