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

const image_directory = "images";

const roll_dice_button = document.getElementById("roll_dice");

roll_dice_button.addEventListener("click", roll_dice);

function roll_dice(event){
    roll_player_dice();
    roll_computer_dice();
}

function roll_player_dice(){
    for(var i=0; i<player_dice_pair.length; i++){
        map = roll_dice_return_dice_map();
        player_dice_pair[i].text(map["value"]);
    }
}

function roll_dice_return_dice_map(){
    dice = Math.floor(Math.random() * 6) + 1;
    return dice_map[dice];
}

function roll_computer_dice(){
    for(var i=0; i<computer_dice_pair.length; i++){
        map = roll_dice_return_dice_map();
        computer_dice_pair[i].text(map["value"]);
    }
}

class DiceGame{
    constructor(){
        this.players = [];
        this.dice_map = {
            1: {"value": 1, "source": "1_dot_dice.png"},
            2: {"value": 2, "source": "2_dot_dice.png"},
            3: {"value": 3, "source": "3_dot_dice.png"},
            4: {"value": 4, "source": "4_dot_dice.png"},
            5: {"value": 5, "source": "5_dot_dice.png"},
            6: {"value": 6, "source": "6_dot_dice.png"},
        };
    }
}

DiceGame.prototype.start = function(){
}

class Player{
    constructor(){
        this.dice_field
        console.log("oh");
    }
}

const dice_game = new DiceGame();
dice_game.start();
