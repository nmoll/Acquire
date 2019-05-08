import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameCreateComponent } from "./game/game-create.component";
import { AcquireComponent } from "./acquire/acquire.component";

const routes: Routes = [
  {
    path: "acquire",
    component: AcquireComponent
  },
  {
    path: "game/create",
    component: GameCreateComponent
  },
  {
    path: "",
    redirectTo: "/game/create",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
