import Character from './character';
import CharacterConfig from './character-config';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';
import Move from './move';
import Scene from './scene';
import Bullet from './bullet';

export default class Ship extends Character {
	constructor(options){
		super(options);
		this.health = 1;
		this.velocity = 1.8;
	}

	getWeaponConfig(shipType, level){
		return CharacterConfig.Weapons[shipType][level];
	}

	shoot(position, weaponConfig, target){
		let options = Object.assign(weaponConfig, {
			position: {
				x: position.x,
				y: position.y
			}
		});
		if(target) options.target = target;
		Scene.addCharacter(new Bullet(options));
	}

	takeDamage(points){
		if(typeof points === "number") this.health = this.health - points;
	}
}