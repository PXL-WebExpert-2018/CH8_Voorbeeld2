import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';
import { Observable } from 'rxjs';
import { Game } from 'src/app/shared/models/game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games$: Observable<Game[]>;

  constructor(private gs: GameService) { }

  ngOnInit() {
    this.laadGames();
  }

  laadGames() {
    this.games$ = this.gs.getGames();
  }

  verwijder(game: Game) {
    this.gs.deleteGame(game).subscribe(() => this.laadGames());
  }


  updatePatch(oldGame: Game) {
    this.gs.editGamePatch(oldGame.id, { rating: 10 }).subscribe(() => this.laadGames());
  }

  updatePut(oldGame: Game) {
    let newGame = new Game(oldGame.title, oldGame.publisher + 'ABC', 0);
    this.gs.editGamePut(oldGame.id, newGame).subscribe(() => this.laadGames());
  }

  getGameInfo(id: string){
    this.gs.getGame(id).subscribe(data => console.log(data));
  }
}
