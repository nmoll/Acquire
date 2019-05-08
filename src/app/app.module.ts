import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AcquireService } from "./acquire/acquire.service";
import { BoardSquareService } from "./board/board-square.service";
import { GameService } from "./game/game.service";
import { HotelChainService } from "./hotel-chain/hotel-chain.service";
import { PlayerService } from "./player/player.service";
import { AcquireEventService } from "./acquire/acquire-event.service";
import { TileBagService } from "./tile/tile-bag.service";
import { MoveHandlerService } from "./move/move-handler.service";
import { StockShareService } from "./stock-share/stock-share.service";
import { NotificationService } from "./notification/notification.service";
import { HistoryLogService } from "./history-log/history-log-service";
import { FirstPersonMoveHandler } from "./move/first-person-move-handler";
import { ComputerMoveHandler } from "./move/computer-move-handler";
import { BasicPlayerStrategy } from "./strategy/basic-player-strategy";
import { AcquireComponent } from "./acquire/acquire.component";
import { PlayerActionComponent } from "./menu/action-menu.component";
import { PlayerActionHistoryLogComponent } from "./menu/action-menu-history-log.component";
import { PlayerActionPlaceTileComponent } from "./menu/action-menu-place-tile.component";
import { PlayerActionBuyStocksComponent } from "./menu/action-menu-buy-stocks.component";
import { PlayerActionResolveMergeStocksComponent } from "./menu/action-menu-resolve-merge-stocks.component";
import { BoardComponent } from "./board/board.component";
import { GameCreateComponent } from "./game/game-create.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { HotelChainDetailsComponent } from "./hotel-chain/hotel-chain-details.component";
import { HotelChainSelectModalComponent } from "./hotel-chain/hotel-chain-select.modal";
import { HotelChainMergeStocksModalComponent } from "./hotel-chain/hotel-chain-merge-stocks.modal";
import { PlayerDeckComponent } from "./player/player-deck.component";
import { TimesPipe } from "./utils/pipe/times-pipe";

@NgModule({
  declarations: [
    AppComponent,
    AcquireComponent,
    PlayerActionComponent,
    PlayerActionHistoryLogComponent,
    PlayerActionPlaceTileComponent,
    PlayerActionBuyStocksComponent,
    PlayerActionResolveMergeStocksComponent,
    BoardComponent,
    GameCreateComponent,
    ScoreboardComponent,
    HotelChainDetailsComponent,
    HotelChainSelectModalComponent,
    HotelChainMergeStocksModalComponent,
    PlayerDeckComponent,
    TimesPipe
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    AcquireService,
    BoardSquareService,
    GameService,
    HotelChainService,
    PlayerService,
    AcquireEventService,
    TileBagService,
    MoveHandlerService,
    StockShareService,
    NotificationService,
    HistoryLogService,
    FirstPersonMoveHandler,
    ComputerMoveHandler,
    BasicPlayerStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
