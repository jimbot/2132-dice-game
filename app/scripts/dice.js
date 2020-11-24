class Dice{
    constructor(players){
        this.players = players;
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


Dice.prototype.start = function(){
    
}

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
