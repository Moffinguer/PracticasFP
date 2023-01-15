import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { HttpClientModule } from "@angular/common/http";
import { appRouting } from "./app.routes";
import { ErrorViewComponent } from "./error-view/error-view.component";
import { TopBarUserComponent } from "./top-bar/top-bar-user/top-bar-user.component";
import { TopBarAdminComponent } from "./top-bar/top-bar-admin/top-bar-admin.component";
import { GiveReturnBookComponent } from "./admin-views/give-return-book/give-return-book.component";
import { UserCrudComponent } from "./admin-views/user-crud/user-crud.component";
import { MyBooksComponent } from "./user-views/my-books/my-books.component";
import { FaultAndReturnedComponent } from "./user-views/fault-and-returned/fault-and-returned.component";
import { BookCrudComponent } from "./admin-views/book-crud/book-crud.component";
import { ToastrModule } from "ngx-toastr";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    ErrorViewComponent,
    TopBarUserComponent,
    TopBarAdminComponent,
    GiveReturnBookComponent,
    UserCrudComponent,
    MyBooksComponent,
    FaultAndReturnedComponent,
    BookCrudComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    appRouting,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
