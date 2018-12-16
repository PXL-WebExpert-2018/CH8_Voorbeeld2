import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';
import { Game } from 'src/app/shared/models/game.model';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  @Output() addedGame = new EventEmitter();

  constructor(private gs: GameService) { }

  ngOnInit() {
  }

  nieuw(frm: any) {
    let newGame = new Game(frm.value.title, frm.value.publisher, frm.value.rating);
    this.gs.addGame(newGame).subscribe(_ => this.addedGame.emit(newGame));
  }

}
