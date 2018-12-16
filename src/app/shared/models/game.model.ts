export class Game {
    title: string;
    publisher: string;
    rating: number;
    id: string;

    constructor(title: string, publisher: string, rating: number, id?: string) {
        this.title = title;
        this.publisher = publisher;
        this.rating = rating;
        this.id = id;
    }

}
