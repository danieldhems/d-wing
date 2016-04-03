import Character from './character';
import CharacterConfig from './character-config';
import Weapon from './weapon';
import IntervalManager from './interval-manager';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';
import Move from './move';

export default class Ship extends Character {
	constructor(options){
		super(options);
		this.position = {};
		this.health = 1;
		this.velocity = 1.8;
	}

	setVelocity(velocity=CharacterConfig.Ship.velocity){
		this.velocity = velocity;
	}

	setWeaponConfig(source, level){
		let options = Object.assign({source}, CharacterConfig.Weapons[source.type][level]);
		this.weapon = new Weapon(options);
	}

	fire(origin){
		let options = Object.assign(this, {
			source: this.source,
			target: this.source === 'enemy' ? Scene.getCharactersInScene()[0] : null,
			position: {
				x: origin.x,
				y: origin.y
			}
		});
		Scene.addCharacter(new Bullet(options));
	}

	takeDamage(points){
		if(typeof points === "number") this.health = this.health - points;
		if(this.health < 1) this.destroy();
	}
}