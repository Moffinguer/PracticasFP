import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Renderer2 } from "@angular/core";
import { prop, values } from "../background/backs";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {
    //Add specifict style for <Body>
    for (let i = 0; i < values.length; i++) {
      this.renderer.setStyle(document.body, prop[i], values[i]);
    }
    this.loginForm = new FormGroup({
      dni: new FormControl("", [
        Validators.maxLength(9),
        Validators.required,
        Validators.pattern(/[0-9]{8}[a-z]{1}/i),
      ]),
      password: new FormControl("", Validators.required),
    });
  }
  ngOnInit() {
    this.getUsers();
    localStorage.removeItem("id");
  }
  //Web Service
  getUsers() {
    const myObserver = {
      next: (x) => {
        const users = JSON.parse(JSON.stringify(x));
        if (users.error != null) {
          this.router.navigate(["./error"]);
        }
        users.forEach((element) => {
          this.loginService.userMainPush(element);
        });
      },
      error: (err) => {
        this.router.navigate(["./error"]);
      },
      complete: () => {},
    };
    this.loginService.getUsers().subscribe(myObserver);
  }
  //Check which kind of user is
  checkUser() {
    let check = false;
    if (this.loginForm.valid) {
      this.loginService.users.forEach((dumb) => {
        if (
          this.dni.value.toUpperCase() === dumb.ID &&
          this.password.value === dumb.PASSWORD
        ) {
          localStorage.setItem("id", this.dni.value.toUpperCase());
          for (let i = 0; i < values.length; i++) {
            this.renderer.removeStyle(document.body, prop[i]);
          }
          if (dumb.TYPE === "STUDENT") {
            check = true;
            this.router.navigate(["./userIndex"]);
          } else {
            check = true;
            this.router.navigate(["./adminIndex"]);
          }
        }
      });
    }
    if (!check) {
      this.toastr.info("No coincide con ningún usuario del sistema", "", {
        timeOut: 3000,
      });
    }
  }
  //GETTERS
  get dni() {
    return this.loginForm.get("dni");
  }
  get password() {
    return this.loginForm.get("password");
  }
}
