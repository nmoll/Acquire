import { Injectable } from '@angular/core';
import { AcquireEventService } from '../acquire/acquire-event.service';
import { PlayerService } from '../player/player.service';

import { Tile } from '../tile/tile';
import { PlayerType } from '../player/player';

@Injectable()
export class NotificationService {

    constructor(
        private acquireEventService: AcquireEventService,
        // private toastCtrl: ToastController,
        private playerService: PlayerService,
    ) {
        // Turning this off for now
        // this.acquireEventService.tilePlacedEvent.subscribe((tile) => this.onTilePlaced(tile));
    }

    onTilePlaced(tile: Tile): void {
        if (this.playerService.getCurrentPlayer().playerType != PlayerType.FIRST_PERSON) {
            this.showToast(`${this.playerService.getCurrentPlayer().name} played tile ${tile.display}`);
        }
    }

    showToast(message: string): void {
        // TODO: fixme
        // var toast = this.toastCtrl.create({
        //     message: message,
        //     duration: 4000,
        //     position: 'bottom',
        //     showCloseButton: true,
        //     cssClass: 'acquire-toast'
        // });
        // toast.present();
    }

    init(): void {
        // Init logic is in constructor. This will be called at the start of every game.
        // Only have this method to give aquire service something to call.
    }
}
