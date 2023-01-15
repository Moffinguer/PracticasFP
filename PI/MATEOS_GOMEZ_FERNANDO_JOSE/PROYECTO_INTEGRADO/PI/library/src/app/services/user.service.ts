import { Injectable } from "@angular/core";
import { URL } from "../background/url";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class UserService {
  readonly url = URL + "USER_VIEW/";
  books = [];
  bookStatus1 = [];
  bookStatus2 = [];
  booksClones = [];
  constructor(private http: HttpClient) {}
  //BOOKS
  getBooks() {
    return this.http.get(this.url + "BOOKS/selectBooks.php");
  }
  askBook(isbn) {
    return this.http.get(
      this.url +
        "BOOKS/askForBook.php?isbn=" +
        isbn +
        "&id=" +
        localStorage.getItem("id")
    );
  }
  renewBook(isbn) {
    return this.http.get(
      this.url +
        "BOOKS/renewBook.php?isbn=" +
        isbn +
        "&id=" +
        localStorage.getItem("id")
    );
  }
  booksAsked(status) {
    return this.http.get(
      this.url +
        "BOOKS/booksAsked.php?id=" +
        localStorage.getItem("id") +
        "&status=" +
        status
    );
  }
  //ACTIONS
  cloneBooks() {
    this.booksClones = this.books;
  }
  pushStatus1(i) {
    this.bookStatus1.push(i);
  }
  pushStatus2(i) {
    this.bookStatus2.push(i);
  }
  userMainPush(val) {
    this.books.push(val);
  }
}
