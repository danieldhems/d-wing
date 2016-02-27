import Move from './move';
import Ship from './ship';
import Bullet from './bullet';
import Shield from './shield';
import Collision from './collision';
import Stage from './stage';
import GameState from './game-state';

export default class PlayerShip extends Ship {
	constructor(options){
		super(options);

		this.config = {
			isSpawned: true,
			weapon: {},
			shield: {},
			position: {},
			health: 1
		}
	}

	spawn(){
		super();
	}

	move(){

	}

	shoot(){

	}

	destroy(){

	}

	pickUp(item){

	}
}