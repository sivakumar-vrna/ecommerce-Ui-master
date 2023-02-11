import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrchestrationService {
banner='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/banner';
latest='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=latest';
Trending='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=trending';
featured='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=featured';
top='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=top';
allbooks='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/activebooks';
upcoming='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/upcoming?userId=112245';


  constructor(
    private http: HttpService
  ) {}

  async header() {
    const headers = {
      'Content-Type': 'application/json',
       'userName':'satheshjkv@gmail.com',
       'macAddress':'123456789',
       'authToken':'YTUzYzM1NTQtZGFkYi00ZjI3LWJlN2YtZTFjZmVjZDRiY2M3',
       'country':'IN'
    };
    return headers;
  }

  async getBanner(country) {
    // return this.http.get<any>("assets/banners.json"); // replace these path with url's eg: https://domain.com/orchservice/?menuName=banner
    const url=this.banner;
    return this.http.getCall(url, environment.capaciorUrl+url)
  }

  async getTrending() {
     const url = this.Trending;
     return this.http.getCall(url, environment.capaciorUrl+url)
    // return this.http.get<any>("assets/trending.json");

  }

  async getLatest() {
    const url = this.latest;
    return this.http.getCall(url, environment.capaciorUrl+url)
    // return this.http.get<any>("assets/latest.json");

  }

  async getfeatured(){
    const url = this.featured;
    return this.http.getCall(url, environment.capaciorUrl+url)
    // return this.http.get<any>("assets/latest.json");


  }

  async getBooks() {
    const url= this.allbooks;
    return this.http.getCall(url, environment.capaciorUrl+url)
    // return this.http.get<any>("assets/books.json");
  }


  async getupcoming(){
    const url=this.upcoming;
    return this.http.getCall(url,environment.capaciorUrl+url)
  }

}
