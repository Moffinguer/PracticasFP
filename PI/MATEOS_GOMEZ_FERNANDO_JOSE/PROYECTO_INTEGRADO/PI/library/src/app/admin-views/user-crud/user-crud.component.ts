import { Component, OnInit, Renderer2 } from "@angular/core";
import * as XLSX from "xlsx";
import { ToastrService } from "ngx-toastr";
import { BookService } from "../../services/book.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { saved } from "src/app/background/pass";
@Component({
  selector: "app-user-crud",
  templateUrl: "./user-crud.component.html",
  styleUrls: ["./user-crud.component.css"],
})
export class UserCrudComponent implements OnInit {
  formUser: FormGroup;
  arrayBuffer: any;
  info: any;
  allInfo;
  fine: Boolean;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private bookService: BookService,
    private renderer: Renderer2
  ) {
    if (!saved()) {
      this.router.navigate(["./login"]);
    }
    this.renderer.setStyle(document.body, "background", "#dfe6e9");
    this.formUser = new FormGroup({
      file: new FormControl(null, [Validators.required]),
    });
    this.info = false;
  }
  ngOnInit() {
    this.selectUser();
  }
  //Gather information from the Excell
  onFileChange(file) {
    this.info = file.target.files[0];
    this.fine = true;
    //Check the type of file it is
    if (
      this.info == null ||
      (this.info.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        this.info.type !== "application/vnd.ms-excel" &&
        this.info.type !== "text/CSV")
    ) {
      this.toastr.error(
        "Formato incorrecto, solo se permiten archivos XSL CSV o XSLX",
        "",
        { timeOut: 3000 }
      );
    } else {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.allInfo = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        this.allInfo.forEach((i) => {
          const dumb = [i.DNI, i.EMAIL, i.NOMBRE, i.APELLIDOS, i.CONTRASENIA];
          dumb.forEach((j) => {
            if (j == null) {
              this.fine = false;
              return;
            }
          });
          if (
            !this.fine ||
            dumb[1].split(" ").length > 1 ||
            !dumb[0].match(/[0-9]{8}[a-z]{1}/i) ||
            dumb[0].length > 9
          ) {
            this.fine = false;
            return;
          }
        });
        if (this.fine) {
          this.allInfo.forEach((i) => {
            this.addUser(i);
          });
        } else {
          this.toastr.error("Formato incorrecto", "", { timeOut: 3000 });
        }
      };
      fileReader.readAsArrayBuffer(this.info);
    }
  }
  //Services
  addUser(val) {
    this.bookService
      .addUser(
        val.NOMBRE.split(" ").join("+"),
        val.APELLIDOS.split(" ").join("+"),
        val.EMAIL.split(" ").join("+"),
        val.CONTRASENIA.split(" ").join("+"),
        val.DNI.split(" ").join("+")
      )
      .subscribe({
        next: (x) => {
          const books = JSON.parse(JSON.stringify(x));
          if (books.error != null) {
            this.toastr.error(books.error, "", { timeOut: 3000 });
          } else {
            this.toastr.success(books.answer, "", { timeOut: 3000 });
          }
          this.deleteUser();
        },
        error: (err) => {
          this.toastr.error("Error, el servicio no está disponible", "", {
            timeOut: 3000,
          });
        },
        complete: () => {},
      });
  }
  selectUser() {
    this.bookService.selectUsers().subscribe({
      next: (x) => {
        this.bookService.cleanUser();
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.router.navigate(["./error"]);
        }
        books.forEach((i) => {
          this.bookService.userPush(i);
        });
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    });
  }
  deleteUser() {
    this.bookService.deleteUsers().subscribe({
      next: (x) => {
        const books = JSON.parse(JSON.stringify(x));
        if (books.error != null) {
          this.toastr.error(books.error, "", { timeOut: 3000 });
        } else {
          this.toastr.success(books.answer, "", { timeOut: 3000 });
        }
        this.selectUser();
      },
      error: (err) => {
        this.toastr.error("Error, el servicio no está disponible", "", {
          timeOut: 3000,
        });
      },
      complete: () => {},
    });
  }
}
