import { Injectable } from "@angular/core";
import { URL } from "../background/url";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class BookService {
  readonly url = URL + "ADMIN_VIEW/";
  booksClone;
  books = [];
  user = [];
  book = [];
  constructor(private http: HttpClient) {}
  cleanClone() {
    this.booksClone = [];
  }
  //MAIN
  getBooks() {
    return this.http.get(this.url + "MAIN/selectBook.php");
  }
  giveBook(isbn, dni) {
    return this.http.get(
      this.url +
        "MAIN/returnGiveBook.php?isbn=" +
        isbn +
        "&id=" +
        dni +
        "&action=give"
    );
  }
  returnBook(isbn, dni) {
    return this.http.get(
      this.url +
        "MAIN/returnGiveBook.php?isbn=" +
        isbn +
        "&id=" +
        dni +
        "&action=return"
    );
  }
  //USERS
  addUser(name, surnames, email, password, dni) {
    return this.http.get(
      this.url +
        "USERS/addUser.php?name=" +
        name +
        "&id=" +
        dni +
        "&surnames=" +
        surnames +
        "&passw=" +
        password +
        "&mail=" +
        email
    );
  }
  deleteUsers() {
    return this.http.get(this.url + "USERS/deleteUsers.php");
  }
  selectUsers() {
    return this.http.get(this.url + "USERS/selectUsers.php");
  }
  //BOOKS
  selectBooks() {
    return this.http.get(this.url + "BOOKS/selectBook.php");
  }
  addBook(isbn, title, topic, subject, stock, ph, author) {
    return this.http.get(
      this.url +
        "BOOKS/addBook.php?isbn=" +
        isbn +
        "&title=" +
        title +
        "&ph=" +
        ph +
        "&topic=" +
        topic +
        "&subject=" +
        subject +
        "&stock=" +
        stock +
        "&author=" +
        author
    );
  }
  deleteBook(isbn) {
    return this.http.get(this.url + "BOOKS/deleteBook.php?isbn=" + isbn);
  }
  checkIfBookIsBorrowed(isbn) {
    return this.http.get(
      this.url + "BOOKS/checkIfBookIsBorrowed.php?isbn=" + isbn
    );
  }
  //ACTIONS
  pushBook(book) {
    this.book.push(book);
  }
  userPush(user) {
    this.user.push(user);
  }
  clean() {
    this.book = [];
  }
  bookMainPush(i) {
    this.books.push(i);
  }
  cloneBook() {
    this.booksClone = this.books;
  }
  cleanUser() {
    this.user = [];
  }
}
