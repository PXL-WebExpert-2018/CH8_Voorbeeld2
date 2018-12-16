import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'

import { Game } from '../models/game.model';


// Nota: bij errors / ontbrekende data neem contact op met dries.swinnen@pxl.be voor een reset

const BASE_API_URL = 'https://webexpert-games.firebaseio.com/';

@Injectable()
export class GameService {
    // HttpClient injecteren via de constructor
    constructor(private http: HttpClient) { }

    /*
        getGames haalt alle games op uit onze FireBase database.
        De map geeft de binnenkomende json door naar de methode parseData.
        Deze methode zet de json objecten handmatig om naar Game objecten.
    */
    getGames(): Observable<Game[]> {
        return this.http.get(BASE_API_URL + 'games.json').pipe(
            map(res => this.parseData(res)),
            catchError(this.handleError)
        );

    }
    /*
        getGame haalt een enkel game Object op uit de API. Er is hier geen conversie naar het model voorzien.
    */
    getGame(id: string): Observable<Game> {
        return this.http.get<Game>(BASE_API_URL + 'games/' + id + '.json').pipe(
            catchError(this.handleError)
        );

    }

    /*
        addGame doet een POST request om een game toe te voegen aan onze games database.
        De conversie van het type Game naar JSON wordt automatisch afgehandeld door Angular.
        De id van het object wordt automatisch gegenereerd door onze backend.
    */
    addGame(game: Game) {
        return this.http.post(BASE_API_URL + 'games.json', game).pipe(
            catchError(this.handleError)
        );
    }

    /*
        deleteGame doet een DELETE request om een game te verwijderen uit onze games database.
        Het verwijderen wordt gedaan aan de hand van de ID van de game.
    */
    deleteGame(game: Game) {
        return this.http.delete(BASE_API_URL + 'games/' + game.id + '.json').pipe(
            catchError(this.handleError)
        );
    }

    /*
        editGamePatch past een property van een bestaand object aan, zonder het object te
        vervangen. De id van het aan te passen object wordt meegegeven aan de methode alsook
        een object van de property & nieuwe value.
    */
    editGamePatch(id: string, property: any) {
        return this.http.patch(BASE_API_URL + 'games/' + id + '.json', property).pipe(
            catchError(this.handleError)
        );
    }
    /*
        editGamePut past de data van een volledig object aan. Het aan te passen object wordt
        bepaald door de ID die meegegeven wordt als ook een volledig game object.
    */
    editGamePut(id: string, newGame: Game) {
        return this.http.patch(BASE_API_URL + 'games/' + id + '.json', newGame).pipe(
            catchError(this.handleError)
        );
    }

    /*
        parseData krijgt een json Object binnen en converteert dit naar een array van het type Game[]
        Object.keys geeft alle unieke ID's terug uit ons JSON object. Via de map operator wordt voor
        elke key een nieuw game object aangemaakt en teruggegeven. Het resultaat is een Game array.
    */
    parseData(json: any): Game[] {
        console.log(json);
        return Object.keys(json).map(key => {
            let game = new Game(json[key].title, json[key].publisher, json[key].rating, key);
            return game;
        });
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }

        return throwError(
            'Something bad happened; please try again later.');
    };

}
