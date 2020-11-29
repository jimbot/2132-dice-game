class DiceGame {
    constructor(number_players) {
        this.dice = new Dice();
        this.game_over = false;
        this.current_round = 0;
        this.number_players = number_players;
        this.players_array = this.initialize_players(this.number_players);
        this.players_dices = {};
        this.initialize_players_dices();
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
            const player_name = this.players_array[i].name;
            this.players_dices[player_name] = {
                'dice_1':`${player_name}_dice_1`,
                'dice_2':`${player_name}_dice_2`,
                'img_1':`${player_name}_img_1`,
                'img_2':`${player_name}_img_2`,
                'total_score':0
            }
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

        // add the round to the top
        field.append(`
            <div id="round">
                <p>
                    Round: <span>${this.current_round}</span>
                </p>
            </div>
        `);

        for(var i=0; i<this.players_array.length; i++) {
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
                        <img class=${img_1} src="images/1_dot_dice.png">
                        <p>Value: <span class=${dice_1}></span></p>
                    </div>
                    <div>
                        <img class=${img_2} src="images/1_dot_dice.png">
                        <p>Value: <span class=${dice_2}></span></p>
                    </div>
                    <div class="score">
                        <p>Round: <span class="round"></span></p>
                        <p>Total: <span class="total"></span></p>
                    </div>
                </div>
            `);
        }
    }

    roll_player_dice() {
        /* Roll each players dice and update the field. */
        for(var i=0; i<this.players_array.length; i++) {
            const dice_1_val = Math.floor((Math.random() * 6) + 1);
            const dice_2_val = Math.floor((Math.random() * 6) + 1);
            const name = `${this.players_array[i].name}`;
            this.update_dice_field(name, dice_1_val, dice_2_val);
        }
        this.handle_current_round_scores();
    }

    handle_current_round_scores() {
        /* Update the round and check if the game should end. */
        this.current_round += 1;
        $(`div#round span`).text(this.current_round);
        if (this.current_round == 3) {
            this.declare_winner();
        }
    }

    declare_winner() {
        /* Get the highest score of all players and declare the winner. */
        let player_with_highest_score;
        let highest_score = 0;

        for(var i=0; i<this.players_array.length; i++) {
            const player_name = this.players_array[i].name;
            const player_score = this.players_dices[player_name]['total_score'];
            if (player_score > highest_score) {
                player_with_highest_score = player_name;
                highest_score = player_score;
            }
        }

        const winner = `${player_with_highest_score} wins! With total score of: ${highest_score}.`;

        console.log(winner);

        this.game_over = true;
    }

    update_dice_field(player_name, dice_1_val, dice_2_val) {
        /* Update the value and images of 1 players hand. */
        const dice_img_1 = this.dice.map[dice_1_val]['source'];
        const dice_img_2 = this.dice.map[dice_2_val]['source'];
        const dice_1 = this.players_dices[player_name]['dice_1'];
        const dice_2 = this.players_dices[player_name]['dice_2'];
        const img_1 = this.players_dices[player_name]['img_1'];
        const img_2 = this.players_dices[player_name]['img_2'];

        const round_score = dice_1_val + dice_2_val;
        this.players_dices[player_name]['total_score'] += round_score;
        const total_score = this.players_dices[player_name]['total_score'];

        $(`span.${dice_1}`).text(dice_1_val);
        $(`span.${dice_2}`).text(dice_2_val);
        $(`img.${img_1}`).attr("src", `images/${dice_img_1}`);
        $(`img.${img_2}`).attr("src", `images/${dice_img_2}`);

        $(`div.${player_name} span.round`).text(round_score);
        $(`div.${player_name} span.total`).text(total_score);
    }

}
