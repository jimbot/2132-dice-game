/**
 * This class keeps stats for the player object.
 */

class Player {
    constructor(name){
        this.name = name;
        this.dice_1_val;
        this.dice_2_val;
        this.dice_1 = `${name}_dice_1`;
        this.dice_2 = `${name}_dice_2`;
        this.img_1 = `${name}_img_1`;
        this.img_2 = `${name}_img_2`;
        this.total_score = 0;
    }
}
