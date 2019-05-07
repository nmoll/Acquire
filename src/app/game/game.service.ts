import { Injectable } from "@angular/core";
import { ReplaySubject, Subject } from "rxjs";
import { Player } from "../player/player";
import { Game } from "./game";

@Injectable()
export class GameService {
  games: Game[] = [];
  currentGame: Game;

  currentGame$: Subject<Game> = new ReplaySubject<Game>(1);

  setCurrentGame(game: Game): void {
    this.currentGame = game;
    this.currentGame$.next(game);
  }

  isCurrentGameEnded(): boolean {
    return this.currentGame.isEnded();
  }

  endCurrentGame(winners: Player[]): void {
    this.currentGame.endGame(winners);
  }

  addGame(game: Game) {
    this.games.push(game);
    this.setCurrentGame(game);
  }
}
