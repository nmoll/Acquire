import { Component, Input } from "@angular/core";
import { AcquireEventService } from "../acquire/acquire-event.service";
import { GameService } from "../game/game.service";
import { HotelChain } from "../hotel-chain/hotel-chain";
import { MoveHandlerService } from "../move/move-handler.service";
import { PlayerAction } from "../player-action/player-action.enum";
import { PlayerType } from "../player/player";
import { PlayerService } from "../player/player.service";
import { BoardSquare } from "./board-square";
import { BoardSquareService } from "./board-square.service";

@Component({
  selector: "board",
  templateUrl: "board.component.html"
})
export class BoardComponent {
  @Input()
  currentPlayerAction: PlayerAction;

  @Input()
  squares: BoardSquare[];

  constructor(
    private acquireEventService: AcquireEventService,
    private boardSquareService: BoardSquareService,
    private playerService: PlayerService,
    private moveHandlerService: MoveHandlerService,
    private gameService: GameService
  ) {}

  getBoardSquareClass(square: BoardSquare): string {
    var result = "";

    var player = this.playerService.getCurrentPlayer();

    if (square.tile) {
      result += "hasTile ";
    }

    if (
      player.selectedTile &&
      player.selectedTile.boardSquareId === square.id
    ) {
      result += "hasTile ";
    }

    if (this.boardSquareService.isPartOfHotelChain(square)) {
      result += "hotel-chain-" + square.tile.hotelChain.type;
    }

    if (player.playerType == PlayerType.FIRST_PERSON) {
      if (
        player.hasTileForBoardSquareId(square.id) &&
        !player.hasPlacedTile &&
        this.currentPlayerAction == PlayerAction.PLACE_TILE
      ) {
        result += "player-tile ";
        var adjacentTiles = this.boardSquareService.getAdjacentTiles(square);
        if (!this.moveHandlerService.isTilePlayable(adjacentTiles)) {
          result += "not-playable ";
        }
      }
    }

    return result;
  }

  onSquareSelected(square: BoardSquare, event: any): void {
    if (square.tile && square.tile.hotelChain) {
      this.onHotelChainSelected(square.tile.hotelChain, event);
    }

    if (this.gameService.isCurrentGameEnded()) {
      return;
    }

    var player = this.playerService.getCurrentPlayer();
    if (player.hasPlacedTile || !player.hasTileForBoardSquareId(square.id)) {
      return;
    }

    if (this.isSquarePlayable(square)) {
      var tile = player.getTileBySquareId(square.id);
      this.acquireEventService.notifyTileSelected(tile);
    }
  }

  private onHotelChainSelected(hotelChain: HotelChain, event: any) {
    // TODO: fixme
    // let popover = this.popoverCtrl.create(HotelChainDetailsComponent, {
    //     hotelChain: hotelChain
    // });
    // popover.present({
    //     ev: event
    // });
  }

  private isSquarePlayable(square: BoardSquare): boolean {
    var adjacentTiles = this.boardSquareService.getAdjacentTiles(square);
    return this.moveHandlerService.isTilePlayable(adjacentTiles);
  }
}
