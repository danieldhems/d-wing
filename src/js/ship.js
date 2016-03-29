import Character from './character';
import CharacterDefaults from './character-defaults';
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

	setVelocity(velocity=CharacterDefaults.Ship.velocity){
		this.velocity = velocity;
	}

	setWeapon(weaponIndex){
		this.weapon.set(CharacterDefaults.Weapons[weaponIndex]);
	}

	takeDamage(points){
		if(typeof points === "number") this.health = this.health - points;
		if(this.health < 1) this.destroy();
	}
}