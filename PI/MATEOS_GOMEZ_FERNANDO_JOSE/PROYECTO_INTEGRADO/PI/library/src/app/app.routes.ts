import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { ErrorViewComponent } from "./error-view/error-view.component";
import { FaultAndReturnedComponent } from "./user-views/fault-and-returned/fault-and-returned.component";
import { MyBooksComponent } from "./user-views/my-books/my-books.component";
import { BookCrudComponent } from "./admin-views/book-crud/book-crud.component";
import { UserCrudComponent } from "./admin-views/user-crud/user-crud.component";
import { GiveReturnBookComponent } from "./admin-views/give-return-book/give-return-book.component";
const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "adminIndex",
    component: AdminComponent,
  },
  {
    path: "userIndex",
    component: UserComponent,
  },
  {
    path: "error",
    component: ErrorViewComponent,
  },
  {
    path: "myBooks",
    component: MyBooksComponent,
  },
  {
    path: "procedures",
    component: GiveReturnBookComponent,
  },
  {
    path: "userCrud",
    component: UserCrudComponent,
  },
  {
    path: "bookCrud",
    component: BookCrudComponent,
  },
  {
    path: "pastBooks",
    component: FaultAndReturnedComponent,
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "login",
  },
];
export const appRouting = RouterModule.forRoot(appRoutes);
