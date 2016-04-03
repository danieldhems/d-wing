import CharacterConfig from './character-config';
import Character from './character';
import Move from './move';
import Scene from './scene';
import Bullet from './bullet';

export default class Weapon extends Character {
	constructor(options){
		super(options);

		Object.assign(this, options);
	}

	fire(origin){
		let options = Object.assign(this, {
			target: this.source.type === 'enemy' ? Scene.getCharactersInScene()[0] : null,
			position: {
				x: origin.x,
				y: origin.y
			}
		});
		Scene.addCharacter(new Bullet(options));
	}

	draw(){
		this.ctx.drawImage(this.sprite, 10, 10, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	getDamage(){
		return this.damage;
	}

	update(){

	}
}