import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL } from "../background/url";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  readonly url = URL + "LOGIN_VIEW/";
  users = [];
  constructor(private http: HttpClient) {}
  //METHODS
  getUsers() {
    return this.http.get(this.url + "getUsers.php");
  }
  //ACTIONS
  userMainPush(val) {
    this.users.push(val);
  }
}
