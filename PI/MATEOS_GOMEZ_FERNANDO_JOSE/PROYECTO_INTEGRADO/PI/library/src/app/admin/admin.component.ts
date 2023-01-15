import { Component, OnInit, Renderer2 } from "@angular/core";
import { BookService } from "../services/book.service";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import { saved } from "../background/pass";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  bookForm: FormGroup;
  rows = [];
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {
    if (!saved()) {
      this.router.navigate(["./login"]);
    }
    this.renderer.setStyle(document.body, "background", "#34495e");
    this.bookForm = new FormGroup({
      status: new FormControl(),
      dateTo: new FormControl(),
      dateFrom: new FormControl(),
      name: new FormControl(),
    });
  }
  ngOnInit() {
    this.getBooks();
  }
  //Create a PDF from the information of the actual list
  convertToPDF() {
    const doc = new jsPDF();
    const col = [
      "Nombre",
      "DNI",
      "ISBN",
      "Titulo",
      "Editorial",
      "Tema",
      "Fecha de solicitud",
      "Fecha de prestamo",
      "Fecha de devolución",
      "Estado",
    ];
    this.rows.push(col);
    this.bookService.booksClone.forEach((i) => {
      this.rows.push([
        i.SURNAMES + "," + i.NAME,
        i.ID_USER,
        i.ISBN,
        i.TITLE,
        i.PUBLISHING_HOUSE,
        i.TOPIC,
        i.REQUEST_DATE,
        i.BORROW_DATE == null ? "****/**/**" : i.BORROW_DATE,
        i.RETURN_DATE == null ? "****/**/**" : i.RETURN_DATE,
        i.STATUS_BOOK,
      ]);
    });
    doc.autoTable(col, this.rows);
    doc.save("Registro" + Date.now() + ".pdf");
    this.rows = [];
    this.getBooks();
  }
  //SERVICES
  getBooks() {
    this.userService.getBooks().subscribe({
      next: (x) => {
        this.bookService.cleanClone();
        this.bookService.books = [];
        this.userService.books = [];
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.userService.userMainPush(i);
        });
        this.bookService.cloneBook();
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
    this.bookService.getBooks().subscribe({
      next: (x) => {
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.bookService.bookMainPush(i);
        });
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
  }
  returnBook(isbn, dni) {
    this.bookService.returnBook(isbn, dni).subscribe({
      next: (x) => {
        const answer = JSON.parse(JSON.stringify(x));
        if (answer.error != null) {
          this.toastr.error("Error, el servicio no está disponible", "", {
            timeOut: 3000,
          });
        } else {
          this.toastr.success(answer.answer, "", {
            timeOut: 3000,
          });
        }
        this.getBooks();
      },
      error: (err) => {
        this.toastr.error("Error, el servicio no está disponible", "", {
          timeOut: 3000,
        });
      },
      complete: () => {},
    });
  }
  giveBook(isbn, dni) {
    this.bookService.giveBook(isbn, dni).subscribe({
      next: (x) => {
        const answer = JSON.parse(JSON.stringify(x));
        if (answer.error != null) {
          this.toastr.error("Error, el servicio no está disponible", "", {
            timeOut: 3000,
          });
        } else {
          this.toastr.success(answer.answer, "", {
            timeOut: 3000,
          });
        }
        this.getBooks();
      },
      error: (err) => {
        this.toastr.error("Error, el servicio no está disponible", "", {
          timeOut: 3000,
        });
      },
      complete: () => {},
    });
  }
  searchUsers() {
    this.bookService.getBooks().subscribe({
      next: (x) => {
        const status =
          this.status.value == null ? "" : this.status.value.toUpperCase();
        const name =
          this.name.value == null ? "" : this.name.value.toUpperCase();
        const dateTo = this.dateTo.value == null ? "" : this.dateTo.value;
        const dateFrom = this.dateFrom.value == null ? "" : this.dateFrom.value;
        this.bookService.cleanClone();
        this.bookService.books = [];
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.bookService.bookMainPush(i);
        });
        this.bookService.cloneBook();
        if (status != "") {
          this.bookService.booksClone = this.bookService.booksClone.filter(
            (i) => {
              return i.STATUS_BOOK == status;
            }
          );
        }
        if (name != "") {
          this.bookService.booksClone = this.bookService.booksClone.filter(
            (i) => {
              return (i.NAME + " " + i.SURNAMES).indexOf(name) > -1;
            }
          );
        }
        if (dateFrom != "" && dateTo != "") {
          this.bookService.booksClone = this.bookService.booksClone.filter(
            (i) => {
              return (
                i.BORROW_DATE >= dateFrom &&
                i.BORROW_DATE <= dateTo &&
                i.BORROW_DATE != null
              );
            }
          );
        }
      },
      error: () => {},
      complete: () => {},
    });
  }
  //GETTERS
  get status() {
    return this.bookForm.get("status");
  }
  get dateTo() {
    return this.bookForm.get("dateTo");
  }
  get dateFrom() {
    return this.bookForm.get("dateFrom");
  }
  get name() {
    return this.bookForm.get("name");
  }
}
