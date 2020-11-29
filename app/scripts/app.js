/* Constants */


/* Player */
const player_die_one = $('div#player div.dice_pair_one span');
const player_die_two = $('div#player div.dice_pair_two span');
player_dice_pair = [player_die_one, player_die_two];

const player_die_one_image = $('div#player div.dice_pair_one span');
const player_die_two_image = $('div#player div.dice_pair_two span');
player_image_pair = [player_die_one_image, player_die_two_image];

/* Computer */
const computer_die_one = $('div#computer div.dice_pair_one span');
const computer_die_two = $('div#computer div.dice_pair_two span');
computer_dice_pair = [computer_die_one, computer_die_two];

const computer_die_one_image = $('div#player div.dice_pair_one span');
const computer_die_two_image = $('div#player div.dice_pair_two span');
computer_image_pair = [computer_die_one_image, computer_die_two_image];

let dice_game = null; // probably a better way to do this...

const image_directory = "images";

const selected_number_players = document.getElementById("choices");
const roll_dice_button = document.getElementById("roll_dice");
const new_game = document.getElementById("new_game");

selected_number_players.addEventListener("click", (event) => {
    const is_button = event.target.nodeName === 'BUTTON';
    if (!is_button) {
        return;
    }
    const number_players = parseInt(event.target.textContent.substring(0,1));
    start_game(number_players);
})

function start_game(number_players) {
    dice_game = new DiceGame(number_players);
}

roll_dice_button.addEventListener("click", (event) => {
    if (!dice_game.game_over) {
        dice_game.roll_player_dice();
    } else {
        roll_dice_button.disabled = true;
    }
})

new_game.addEventListener("click", (event) => {
    location.reload();
})
