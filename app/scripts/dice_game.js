class DiceGame {
    constructor(number_players) {
        this.number_players = number_players;
        this.players_array = this.initialize_players(this.number_players);
    }

    initialize_players(num_players) {
        var players_array = [];
        for(var i=0; i<num_players; i++){
            players_array.push(new Player()); 
        }
        return players_array;
    }
}
