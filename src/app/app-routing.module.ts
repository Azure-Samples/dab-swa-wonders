import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "./shared/error-page/error-page.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./wonders/wonders.module").then((m) => m.WondersModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./wonders/wonders.module").then((m) => m.WondersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
