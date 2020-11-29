/**
 * Starting point of the game.
 */

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
