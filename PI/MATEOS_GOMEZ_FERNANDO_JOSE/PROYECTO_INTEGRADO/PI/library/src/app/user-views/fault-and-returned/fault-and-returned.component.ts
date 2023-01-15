import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { saved } from "src/app/background/pass";

@Component({
  selector: "app-fault-and-returned",
  templateUrl: "./fault-and-returned.component.html",
  styleUrls: ["./fault-and-returned.component.css"],
})
export class FaultAndReturnedComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {
    if (!saved()) {
      this.router.navigate(["./login"]);
    }
  }

  ngOnInit() {
    this.getBooksStatus("DEVUELTO", "FALTA");
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
