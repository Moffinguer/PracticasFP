import { Component, OnInit, Renderer2 } from "@angular/core";
import { BookService } from "../../services/book.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { saved } from "src/app/background/pass";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../../services/login.service";
@Component({
  selector: "app-give-return-book",
  templateUrl: "./give-return-book.component.html",
  styleUrls: ["./give-return-book.component.css"],
})
export class GiveReturnBookComponent implements OnInit {
  giveReturnForm: FormGroup;
  constructor(
    private bookService: BookService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {
    if (!saved()) {
      this.router.navigate(["./login"]);
    }
    this.renderer.setStyle(document.body, "background", "#dfe6e9");
    this.giveReturnForm = new FormGroup({
      dni: new FormControl("", Validators.required),
      isbn: new FormControl("", Validators.required),
      action: new FormControl("", Validators.required),
    });
  }
  ngOnInit() {
    //Get the ISBN of the books on the database
    this.bookService.selectBooks().subscribe({
      next: (x) => {
        this.bookService.book = [];
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.bookService.pushBook(i);
        });
      },
      error: (z) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
    this.loginService.getUsers().subscribe({
      next: (x) => {
        this.loginService.users = [];
        const users = JSON.parse(JSON.stringify(x));
        if (users.error != null) {
          this.router.navigate(["./error"]);
        }
        users.forEach((i) => {
          if (i.TYPE != "ADMIN") {
            this.loginService.userMainPush(i);
          }
        });
      },
      error: (z) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
  }
  //Service actions
  execution() {
    const dumb = {
      next: (x) => {
        const answer = JSON.parse(JSON.stringify(x));
        if (answer.error != null) {
          this.toastr.error(answer.error, "", { timeOut: 3000 });
        } else {
          this.toastr.success(answer.answer, "", { timeOut: 3000 });
        }
      },
      error: (err) => {
        this.toastr.error("Error, el servicio no está disponible", "", {
          timeOut: 3000,
        });
      },
      complete: () => {},
    };
    if (this.dni.value == null || this.isbn.value == null) {
      this.toastr.error("Rellene los campos", "", {
        timeOut: 3000,
      });
    } else {
      if (this.action.value === "Prestar") {
        this.bookService
          .giveBook(this.isbn.value, this.dni.value)
          .subscribe(dumb);
      } else {
        this.bookService
          .returnBook(this.isbn.value, this.dni.value)
          .subscribe(dumb);
      }
    }
  }
  //GETTERS
  get action() {
    return this.giveReturnForm.get("action");
  }
  get dni() {
    return this.giveReturnForm.get("dni");
  }
  get isbn() {
    return this.giveReturnForm.get("isbn");
  }
}
