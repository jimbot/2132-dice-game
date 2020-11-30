/**
 * This class is responsible for tracking and updating the game state,
 * ie. the current round and the players.
 */

class DiceGame {
    constructor(number_players) {
        this.dice = new Dice();
        this.game_over = false;
        this.current_round = 0;
        this.players_array = [];
        this.number_players = number_players;
        this.initialize_players(this.number_players);
        this.enable_playing_field();
    }

    initialize_players(num_players) {
        for(var i=0; i<num_players; i++){
            var name = this.get_random_name();
            this.players_array.push(new Player(name)); 
        }
    }

    get_random_name() {
        const names = ["Leonila", "Arlena", "Mao", "Julie", "Marci",
                       "Joycelyn", "Florence", "Deangelo", "Deandrea",
                       "Annita", "Holley", "Orville", "Joaquin", "Shaun",
                       "Zoe", "Yvette", "Tammie", "Jim", "Brenna", "Alethea",
                       "Jordan", "Forest", "Kevin", "James", "Brittney",
                       "Larry", "Sarah", "Stacey", "Kelly"]
        const random_name = names[Math.floor(Math.random() * names.length)];
        return random_name;
    }

    enable_playing_field() {
        /* Hide and show certain content to display proper playing field. */
        $("div.prompt").css("display", "none");
        $("div.controls").css("display", "flex");
        this.create_dynamic_playing_field();
    }

    create_dynamic_playing_field() {
        /* Create the dice field dynamically. */
        const field = $('div.field');
        const container = $('div.container');

        container.append(`
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
                <div class="${name} column">
                    <p id="player-name">${name}</p>
                    <p>${player}</p>

                    <div class="dice_column">
                    
                        <div class="dices">
                            <div>
                                <img class=${img_1} src="images/1_dot_dice.png">
                                <p>Value: <span class=${dice_1}></span></p>
                            </div>

                            <div>
                                <img class=${img_2} src="images/1_dot_dice.png">
                                <p>Value: <span class=${dice_2}></span></p>
                            </div>
                        </div>

                        <div class="score">
                            <p>Round: <span class="round"></span></p>
                            <p>Total: <span class="total"></span></p>
                        </div>

                    </div>

                </div>
            `);
        }
    }

    roll_player_dice() {
        /* Roll each players dice and update the field. */
        for(var i=0; i<this.players_array.length; i++) {
            const player = this.players_array[i];
            player.dice_1_val = Math.floor((Math.random() * 6) + 1);
            player.dice_2_val = Math.floor((Math.random() * 6) + 1);
            this.update_dice_field(player);
        }
        this.evaluate_end_of_round();
    }

    update_dice_field(player) {
        /* Update the value and images of 1 players hand. */
        const dice_img_1 = this.dice.map[player.dice_1_val]['source'];
        const dice_img_2 = this.dice.map[player.dice_2_val]['source'];
        const round_score = this.calculate_round_score(player)
        $(`span.${player.dice_1}`).text(player.dice_1_val);
        $(`span.${player.dice_2}`).text(player.dice_2_val);
        $(`img.${player.img_1}`).attr("src", `images/${dice_img_1}`);
        $(`img.${player.img_2}`).attr("src", `images/${dice_img_2}`);
        $(`div.${player.name} span.round`).text(round_score);
        $(`div.${player.name} span.total`).text(player.total_score);
    }

    calculate_round_score(player) {
        let round_score;
        if (player.dice_1_val == 1 || player.dice_2_val == 1) {
            round_score = 0;
        } else if (player.dice_1_val == player.dice_2_val) {
            round_score = (player.dice_1_val + player.dice_2_val) * 2;
        }
        else {
            round_score = player.dice_1_val + player.dice_2_val;
        }
        player.total_score += round_score;
        return round_score;
    }

    evaluate_end_of_round() {
        /* Handle end of round and determine if winner should be announced. */
        this.current_round += 1;
        $(`div#round span`).text(this.current_round);
        if (this.current_round == 3) {
            this.declare_winner();
        }
    }

    declare_winner() {
        /* Get the highest score of all players and declare the winner. */
        const winning_text = this.get_players_with_highest_score()
        this.show_popup_box_declaring_winner(winning_text)
        $(`div#round`).text(winning_text);
        this.game_over = true;
    }

    get_players_with_highest_score() {
        /*
        Determine the player (or players, if there is a tie) with the 
        highest score and return the 'text' to display signifying a winner.
        */
        let winner_text;
        let players_tied = [];
        let player_with_highest_score;
        let highest_score = 0;

        for(var i=0; i<this.players_array.length; i++) {
            const player = this.players_array[i];
            const player_score = player.total_score;
            if (player_score == highest_score) {
                players_tied.push(player_with_highest_score);
                players_tied.push(player.name);
            }

            if (player_score > highest_score) {
                player_with_highest_score = player.name;
                highest_score = player_score;
                players_tied = []; // clear the players tied array
            }
        }

        if (players_tied.length) {
            winner_text = `${players_tied.length} way tie! Congratulations:
                           {${players_tied}} with score ${highest_score}.`
        } else {
            winner_text = `${player_with_highest_score} wins!
                           With total score of: ${highest_score}.`;
        }

        return winner_text;
    }

    show_popup_box_declaring_winner(winning_text) {
        /* Display a closeable popup announcing the winner of the game. */
        $(`div#popup p`).text(winning_text);
        var modal = document.getElementById("popup");
        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
          }
          
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
    }
}
