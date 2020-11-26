class DiceGame {
    constructor(number_players) {
        this.dice = new Dice();
        this.number_players = number_players;
        this.players_array = this.initialize_players(this.number_players);
        console.log(this.players_array);
        this.players_dices = {};
        this.enable_playing_field();
    }

    initialize_players(num_players) {
        var players_array = [];
        for(var i=0; i<num_players; i++){
            var name = this.get_random_name();
            players_array.push(new Player(name)); 
        }
        return players_array;
    }

    get_random_name() {
        const names = ["Leonila", "Arlena", "Mao", "Julie", "Marci",
                       "Joycelyn", "Florence", "Deangelo", "Deandrea",
                       "Annita", "Holley", "Orville", "Joaquin", "Shaun",
                       "Zoe", "Yvette", "Tammie", "Jame", "Brenna", "Alethea"]
        const random_name = names[Math.floor(Math.random() * names.length)];
        return random_name;
    }

    initialize_players_dices() {
        for(var i=0; i<this.players_array.length; i++){
            this.players_dices[this.players_array[i].name] = {}
        }
    }

    enable_playing_field() {
        $("div.prompt").css("display", "none");
        $("div.button").css("display", "block");
        this.create_dynamic_playing_field();
    }

    create_dynamic_playing_field() {
        /* Create the dice field dynamically. */
        const field = $('div.field');
        field.css("display", "inline-block");

        for(var i=0; i<this.players_array.length; i++){
            const player = `player ${i+1}`; // we don't want 'player 0'
            const name = `${this.players_array[i].name}`;
            const dice_1 = `${name}_dice_1`;
            const img_1 = `${name}_img_1`;
            const dice_2 = `${name}_dice_2`;
            const img_2 = `${name}_img_2`;

            field.append(`
                <div class=${name}>
                    <p>${player} - ${name}</p>
                    <div>
                        <img class=${img_1}>
                        <p>Value: <span class=${dice_1}></span></p>
                    </div>
                    <div>
                        <img class=${img_2}>
                        <p>Value: <span class=${dice_2}></span></p>
                    </div>
                </div>
            `)
        }
    }

    roll_player_dice() {
        /* Roll each players dice and update the field. */
        this.update_dice_field();
    }

    update_dice_field() {
        /* Update the value and images. */
    }
}
