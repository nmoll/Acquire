import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Player } from "./player";

@Component({
  selector: "player-deck",
  templateUrl: "player-deck.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDeckComponent {
  @Input()
  players: Player[];

  constructor() {}
}
