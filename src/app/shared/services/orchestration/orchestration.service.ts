import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
  constructor(
    private http: HttpClient
  ) { }


  getBanner(country) {
    // return this.http.get<any>("assets/banners.json"); // replace these path with url's eg: https://domain.com/orchservice/?menuName=banner
    const url=this.banner;
    return this.http.get(url,country)
  }

  getTrending() {
     const url = this.Trending;
     return this.http.get(url);
    // return this.http.get<any>("assets/trending.json");
    
  }

  getLatest() {
    const url = this.latest;
    return this.http.get(url);
    // return this.http.get<any>("assets/latest.json");

  }

  getfeatured(){
    const url = this.featured;
    return this.http.get(url);
    // return this.http.get<any>("assets/latest.json");

   
  }

  getBooks() {
    const url= this.allbooks;
    return this.http.get(url);
    // return this.http.get<any>("assets/books.json");
  }
  
 
}
