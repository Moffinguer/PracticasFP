import { Component, OnInit, Renderer2 } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl } from "@angular/forms";
import { saved } from "../background/pass";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    if (!saved()) {
      this.router.navigate(["./login"]);
    }
    this.renderer.setStyle(document.body, "background", "#a29bfe");
    this.searchForm = new FormGroup({
      subject: new FormControl(),
      theme: new FormControl(),
      title: new FormControl(),
      isbn: new FormControl(),
      author: new FormControl(),
    });
  }
  //WB
  getBooks() {
    const obs = {
      next: (x) => {
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.userService.userMainPush(i);
        });
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    };
    this.userService.getBooks().subscribe(obs);
    this.userService.cloneBooks();
  }
  askForBooks(isbn) {
    const dumb = {
      next: (x) => {
        if (JSON.parse(JSON.stringify(x)).error != null) {
          this.toastr.error("Error, el servicio no está disponible", "", {
            timeOut: 3000,
          });
        } else {
          this.toastr.success(
            "Libro pedido, vaya a su biblioteca a reclamarlo",
            "",
            { timeOut: 3000 }
          );
        }
      },
      error: (err) => {
        this.toastr.error("Error, el servicio no está disponible", "", {
          timeOut: 3000,
        });
      },
      complete: () => {},
    };
    this.userService.askBook(isbn).subscribe(dumb);
  }
  //SEARCH BOOKS FROM THE WB
  searchBook() {
    this.userService.getBooks().subscribe({
      next: (x) => {
        this.userService.books = [];
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.userService.userMainPush(i);
        });
        this.userService.cloneBooks();
        const subject =
          this.subject.value != null ? this.subject.value.toUpperCase() : "";
        const theme =
          this.theme.value != null ? this.theme.value.toUpperCase() : "";
        const title =
          this.title.value != null ? this.title.value.toUpperCase() : "";
        const isbn =
          this.isbn.value != null ? this.isbn.value.toUpperCase() : "";
        const author =
          this.author.value != null ? this.author.value.toUpperCase() : "";
        this.userService.cloneBooks();
        if (subject != "") {
          this.userService.booksClones = this.userService.booksClones.filter(
            (i) => {
              return i.SUBJECT.indexOf(subject) > -1;
            }
          );
        }
        if (theme != "") {
          this.userService.booksClones = this.userService.booksClones.filter(
            (i) => {
              return i.TOPIC.indexOf(theme) > -1;
            }
          );
        }
        if (title != "") {
          this.userService.booksClones = this.userService.booksClones.filter(
            (i) => {
              return i.TITLE.indexOf(title) > -1;
            }
          );
        }
        if (isbn != "") {
          this.userService.booksClones = this.userService.booksClones.filter(
            (i) => {
              return i.ISBN.indexOf(isbn) > -1;
            }
          );
        }
        if (author != "") {
          this.userService.booksClones = this.userService.booksClones.filter(
            (i) => {
              return i.AUTHOR.indexOf(author) > -1;
            }
          );
        }
      },
      error: () => {},
      complete: () => {},
    });
  }
  ngOnInit() {
    this.userService.booksClones = [];
  }
  //GETTERS
  get subject() {
    return this.searchForm.get("subject");
  }
  get theme() {
    return this.searchForm.get("theme");
  }
  get title() {
    return this.searchForm.get("title");
  }
  get isbn() {
    return this.searchForm.get("isbn");
  }
  get author() {
    return this.searchForm.get("author");
  }
}
