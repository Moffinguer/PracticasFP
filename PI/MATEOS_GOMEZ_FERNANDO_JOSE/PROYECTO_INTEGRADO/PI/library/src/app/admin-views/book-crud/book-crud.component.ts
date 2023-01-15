import { Component, OnInit, Renderer2 } from "@angular/core";
import { BookService } from "../../services/book.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { saved } from "src/app/background/pass";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-book-crud",
  templateUrl: "./book-crud.component.html",
  styleUrls: ["./book-crud.component.css"],
})
export class BookCrudComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {
    if (!saved()) {
      this.router.navigate(["./login"]);
    }
    this.renderer.setStyle(document.body, "background", "#dfe6e9");
    this.bookForm = new FormGroup({
      isbn: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      topic: new FormControl("", Validators.required),
      subject: new FormControl("", Validators.required),
      stock: new FormControl(0, [
        Validators.required,
        Validators.pattern(/[0-9]+/),
      ]),
      ph: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.selectBooks();
  }
  //Service Actions
  selectBooks() {
    this.bookService.clean();
    this.bookService.selectBooks().subscribe({
      next: (x) => {
        this.bookService.books = [];
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.bookService.pushBook(i);
        });
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
  }
  addBook() {
    if (this.check()) {
      //Parse data
      this.bookService
        .addBook(
          this.isbn.value.replace(" ", "+"),
          this.title.value.replace(" ", "+"),
          this.topic.value.replace(" ", "+"),
          this.subject.value.replace(" ", "+"),
          this.stock.value.replace(" ", "+"),
          this.ph.value.replace(" ", "+"),
          this.author.value.replace(" ", "+")
        )
        .subscribe({
          next: (x) => {
            let i = JSON.parse(JSON.stringify(x));
            if (i.error != null) {
              this.toastr.error(i.error, "", { timeOut: 3000 });
            } else {
              this.toastr.success(i.answer, "", { timeOut: 3000 });
            }
            this.selectBooks();
          },
          error: (err) => {
            this.toastr.error(
              "Error al rellenar el formulario, valores incorrectos",
              "",
              { timeOut: 3000 }
            );
          },
          complete: () => {},
        });
    } else {
      this.toastr.error(
        "Error al rellenar el formulario, valores incorrectos",
        "",
        { timeOut: 3000 }
      );
    }
  }
  deleteBook(isbn) {
    this.bookService.deleteBook(isbn).subscribe({
      next: (x) => {
        let i = JSON.parse(JSON.stringify(x));
        if (i.error != null) {
          this.toastr.error(i.error, "", { timeOut: 3000 });
        } else {
          this.toastr.success(i.answer, "", { timeOut: 3000 });
          this.selectBooks();
        }
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
    this.selectBooks();
  }
  eliminate(isbn) {
    this.bookService.checkIfBookIsBorrowed(isbn).subscribe({
      next: (x) => {
        const i = JSON.parse(JSON.stringify(x));
        if (i.error != null) {
          this.toastr.error(i.error, "", { timeOut: 3000 });
        } else {
          if (i.answer == "true") {
            this.deleteBook(isbn);
          } else {
            this.toastr.error(
              "No puede borrar un libro que está pedido por un alumno",
              "",
              { timeOut: 3000 }
            );
          }
        }
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
  }
  //GETTERS
  get isbn() {
    return this.bookForm.get("isbn");
  }
  get title() {
    return this.bookForm.get("title");
  }
  get ph() {
    return this.bookForm.get("ph");
  }
  get subject() {
    return this.bookForm.get("subject");
  }
  get stock() {
    return this.bookForm.get("stock");
  }
  get topic() {
    return this.bookForm.get("topic");
  }
  get author() {
    return this.bookForm.get("author");
  }
  //Evaluate if the fields are filled
  check() {
    return (
      this.isbn.value != null &&
      this.title.value != null &&
      this.topic.value != null &&
      this.subject.value != null &&
      this.stock.value != null &&
      this.ph.value != null &&
      this.stock.value != null &&
      this.author.value != null
    );
  }
}
