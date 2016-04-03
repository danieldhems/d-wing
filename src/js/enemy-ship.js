import CharacterConfig from './character-config';
import Ship from './ship';
import Weapon from './weapon';
import Utils from './utils';
import Scene from './scene';

export default class EnemyShip extends Ship {
	constructor(options){
		super(options);

		Object.assign(this, CharacterConfig.EnemyShips[0])

		this.id = Date.now();

		this.position = {
			x: 300,
			y: this.canvas.height/2-this.height/2
		};

		this.setWeaponConfig = this.setWeaponConfig.bind(this);
		this.setWeaponConfig(this, this.currentWeaponLevel);

		this.update = this.update.bind(this);
		this._lastShotFired = Date.now();
	}

	update(elapsed){
		this.draw();
		let delta = Date.now() - this._lastShotFired;
		if(delta > this.fireRate){
			this.shoot();
			this._lastShotFired = Date.now();
		}
	}

	shoot(){
		this.weapon.fire(this.position);
	}

	draw(){
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}
}
