import { Component, OnDestroy, OnInit } from "@angular/core";
import { BoardSquareService } from "../board/board-square.service";
import { Game } from "../game/game";
import { GameService } from "../game/game.service";
import { HotelChainService } from "../hotel-chain/hotel-chain.service";
import { PlayerAction } from "../player-action/player-action.enum";
import { Player, PlayerType } from "../player/player";
import { PlayerService } from "../player/player.service";
import { TileBagService } from "../tile/tile-bag.service";
import { AcquireEventService } from "./acquire-event.service";
import { AcquireService } from "./acquire.service";

@Component({
  selector: "acquire",
  templateUrl: "acquire.component.html"
})
export class AcquireComponent implements OnInit, OnDestroy {
  currentPlayerAction: PlayerAction = PlayerAction.PLACE_TILE;

  constructor(
    private acquireService: AcquireService,
    private acquireEventService: AcquireEventService,
    public boardSquareService: BoardSquareService,
    private tileBagService: TileBagService,
    private hotelChainService: HotelChainService,
    private gameService: GameService,
    public playerService: PlayerService
  ) {}

  setCurrentPlayerAction(playerAction: PlayerAction) {
    this.currentPlayerAction = playerAction;
  }

  startGame(): void {
    let squares = this.boardSquareService.init();
    let tiles = this.tileBagService.initTiles();
    let hotelChains = this.hotelChainService.init();
    let players = [
      new Player("Nate", PlayerType.FIRST_PERSON),
      new Player("Kate", PlayerType.COMPUTER)
    ];
    let game = new Game(players, players[0], squares, tiles, hotelChains);

    this.gameService.addGame(game);
    // this.navCtrl.push(AcquireComponent);
  }

  ngOnInit(): void {
    this.startGame();
    this.acquireService.initGame();
    this.acquireEventService.notifyGameEntered();
  }

  ngOnDestroy(): void {
    this.acquireEventService.notifyGameExited();
  }
}
