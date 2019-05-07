import { Component, Output, EventEmitter } from "@angular/core";
import { ScoreboardComponent } from "../scoreboard/scoreboard.component";
import { PlayerService } from "../player/player.service";
import { HotelChainService } from "../hotel-chain/hotel-chain.service";
import { AcquireEventService } from "../acquire/acquire-event.service";
import { MoveHandlerService } from "../move/move-handler.service";
import { StockShareService } from "../stock-share/stock-share.service";
import { GameService } from "../game/game.service";
import { StockShare } from "../stock-share/stock-share";
import { PlayerType } from "../player/player";
import { PlayerAction } from "../player-action/player-action.enum";
import { PlayerActionRequestResolveMergeStocks } from "../player-action/player-action-request-resolve-merge-stocks";

@Component({
    selector: 'action-menu',
    templateUrl: 'action-menu.component.html'
})
export class PlayerActionComponent {

    @Output() onMenuChange = new EventEmitter();

    // For accessing in template
    PlayerActionType = PlayerAction;
    playerAction: PlayerAction;

    resolveMergeStocksRequest: PlayerActionRequestResolveMergeStocks;

    constructor(
        // private modalCtrl: ModalController,
        // private alertCtrl: AlertController,
        // private navCtrl: NavController,
        private playerService: PlayerService,
        private hotelChainService: HotelChainService,
        private acquireEventService: AcquireEventService,
        private moveHandlerService: MoveHandlerService,
        private stockShareService: StockShareService,
        private gameService: GameService
    ) {}

    ngOnInit(): void {

        this.acquireEventService.tilePlacedEvent.subscribe((tile) => {
            this.setPlayerAction(PlayerAction.BUY_STOCKS);
        });

        this.acquireEventService.playerChangeEvent.subscribe((tile) => {
            this.setPlayerAction(PlayerAction.HISTORY_LOG);
        });

        this.acquireEventService.requestPlayerActionEvent.subscribe((playerActionRequest: PlayerActionRequestResolveMergeStocks) => {
            console.log('requesting action', playerActionRequest);
            this.resolveMergeStocksRequest = playerActionRequest;
            this.setPlayerAction(playerActionRequest.getAction());
        });

        this.setPlayerAction(PlayerAction.PLACE_TILE);
    }

    onPlayerActionRequestDone(): void {
        console.log('player action request done. setting action to BUY_STOCKS');
        let callback = this.resolveMergeStocksRequest.getCallback();
        callback();
        this.setPlayerAction(PlayerAction.BUY_STOCKS);
        this.resolveMergeStocksRequest = null;
    }

    isCurrentPlayerComputer(): boolean {
        return this.playerService.getCurrentPlayer().isComputer();
    }

    getCurrentPlayerName(): string {
        return this.playerService.getCurrentPlayer().name;
    }

    showScoreboard(): void {
        // TODO: fixme
        // var modal = this.modalCtrl.create(ScoreboardComponent);
        // modal.present();
    }

    getStockSharesForPurchase(): StockShare[] {
        let stockShareOrder = this.playerService.getCurrentPlayer().stockShareOrder;
        if (!stockShareOrder) {
            return [];
        }
        return stockShareOrder.stockShares;
    }

    endTurn(): void {
        if (!this.getStockSharesForPurchase().length && this.playerCanAffordAtleastOneStock()) {
            // TODO: fixme
            // let confirm = this.alertCtrl.create({
            //     title: this.endTurnWithoutStocksTitle,
            //     message: this.endTurnWithoutStocksMessage,
            //     buttons: [
            //         {
            //             text: this.yesLabel,
            //             handler: () => {
            //                 this.acquireEventService.notifyEndTurn();
            //             }
            //         },
            //         {
            //             text: this.cancelLabel
            //         }
            //     ]
            // });
            // confirm.present();
        } else {
            this.acquireEventService.notifyEndTurn();
        }
    }

    private playerCanAffordAtleastOneStock(): boolean {
        let player = this.playerService.getCurrentPlayer();
        let activeHotelChains = this.hotelChainService.getActiveHotelChains();
        for (let hotelChain of activeHotelChains) {
            if (this.stockShareService.hasAvailableStockShare(hotelChain)) {
                if (player.cash > hotelChain.getStockPrice()) {
                    return true;
                }
            }
        }
        return false;
    }

    onHistoryLogOk(): void {
        this.setPlayerAction(PlayerAction.PLACE_TILE);
    }

    private setPlayerAction(playerAction: PlayerAction): void {
        if (this.playerService.getCurrentPlayer().playerType == PlayerType.FIRST_PERSON || playerAction == PlayerAction.RESOLVE_MERGE_STOCKS) {
            this.playerAction = playerAction;
            this.onMenuChange.emit(this.playerAction);
        }
    }

    canEndGame(): boolean {
        return !this.gameService.isCurrentGameEnded() && this.moveHandlerService.canEndGame();
    }

    endGame(): void {
        // TODO: fixme
        // let confirm = this.alertCtrl.create({
        //     title: this.endGamePromptTitle,
        //     message: this.endGamePromptMessage,
        //     buttons: [
        //         {
        //             text: this.yesLabel,
        //             handler: () => {
        //                 this.moveHandlerService.endGame();
        //             }
        //         },
        //         {
        //             text: this.cancelLabel
        //         }
        //     ]
        // });
        // confirm.present();
    }

    exitGame(): void {
        // TODO: Fixme
        // this.navCtrl.popToRoot();
    }

}