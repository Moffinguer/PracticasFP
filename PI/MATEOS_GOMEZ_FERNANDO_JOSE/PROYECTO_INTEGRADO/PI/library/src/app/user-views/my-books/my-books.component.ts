import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ToastrService } from "ngx-toastr";
import { saved } from "src/app/background/pass";

@Component({
  selector: "app-my-books",
  templateUrl: "./my-books.component.html",
  styleUrls: ["./my-books.component.css"],
})
export class MyBooksComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {
    if (!saved()) {
      this.router.navigate(["./login"]);
    }
  }

  ngOnInit() {
    this.getBooksStatus("PRESTADO", "SOLICITADO");
  }
  //WB
  renewBook(isbn) {
    this.userService.renewBook(isbn).subscribe({
      next: (x) => {
        const bookRenew = JSON.parse(JSON.stringify(x));
        if (bookRenew.error != null) {
          this.toastr.success(bookRenew.error, "", { timeOut: 3000 });
        } else {
          this.toastr.success(bookRenew.answer, "", { timeOut: 3000 });
        }
        this.getBooksStatus("PRESTADO", "SOLICITADO");
      },
    });
  }
    //Action to retrieve data
  getBooksStatus(status1, status2) {
    this.userService.booksAsked(status1).subscribe({
      next: (x) => {
        this.userService.bookStatus1 = [];
        const bookStatus = JSON.parse(JSON.stringify(x));
        if (bookStatus.error != null) {
          this.router.navigate(["./error"]);
        }
        bookStatus.forEach((i) => {
          this.userService.pushStatus1(i);
        });
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
    this.userService.booksAsked(status2).subscribe({
      next: (x) => {
        this.userService.bookStatus2 = [];
        const bookStatus = JSON.parse(JSON.stringify(x));
        if (bookStatus.error != null) {
          this.router.navigate(["./error"]);
        }
        bookStatus.forEach((i) => {
          this.userService.pushStatus2(i);
        });
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
  }
}
