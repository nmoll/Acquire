import { Component, OnInit } from "@angular/core";

import { PlayerService } from "../player/player.service";
import { HotelChain } from "../hotel-chain/hotel-chain";

import { Player } from "../player/player";

@Component({
  selector: "hotel-details",
  template: `
    <div class="list">
      <div class="list__header">
        {{ hotelChain.name }}
      </div>
      <div class="item" *ngFor="let player of players">
        <span class="icon icon-person"></span>
        <h2>{{ player.name }}</h2>
        <span item-end>{{
          player.getStockShareForHotelChain(hotelChain).quantity
        }}</span>
      </div>
    </div>
  `
})
export class HotelChainDetailsComponent implements OnInit {
  private hotelChain: HotelChain;
  private players: Player[];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    // TODO: fixme
    // this.hotelChain = this.navParams.data.hotelChain;
    // this.players = this.playerService.getPlayers()
    //     .filter((p) => {
    //         return p.getStockShareForHotelChain(this.hotelChain).quantity > 0;
    //     })
    //     .sort((p1, p2) => {
    //         return p2.getStockShareForHotelChain(this.hotelChain).quantity -
    //             p1.getStockShareForHotelChain(this.hotelChain).quantity;
    //     });
  }
}
