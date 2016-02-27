import Move from './move';
import Character from './character';
import Bullet from './bullet';
import Shield from './shield';
import Collision from './collision';
import Stage from './stage';
import GameState from './game-state';

export default class Ship extends Character {
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