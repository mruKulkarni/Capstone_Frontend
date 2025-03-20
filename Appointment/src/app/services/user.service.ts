import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = "http://localhost:8081/user/login";

  constructor(private httpClient:HttpClient) { }
  loginUser(user: { emailId: string; password: string; }):Observable<object>{
    //console.log(user);
    return this.httpClient.post(`${this.baseUrl}`,user);

  }
}
