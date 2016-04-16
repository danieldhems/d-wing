import CharacterConfig from './character-config';
import Ship from './ship';
import Move from './move';
import Scene from './scene';
import Bullet from './bullet';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';

export default class Turret extends Ship {
	constructor(options){
		super(options);
		Object.assign(this, options);
		this.type = 'turret';
		this.ship = Scene.getCharactersInScene()[0];
		this.spriteArray = this.ship.weapon.turrets.spriteCoords;
		this.currentSpriteStep = 0;
		this.getSpriteCoords = this.getSpriteCoords.bind(this);
		this._lastSpriteFrame = Date.now();
		this.spriteCoords = this.getSpriteCoords();
		// this.spriteCoords = {x:0,y:78}
	}

	draw(){
		if(Date.now() - this._lastSpriteFrame > this.ship.weapon.turrets.animRate){
			this._lastSpriteFrame = Date.now();
			this.spriteCoords = this.getSpriteCoords();
		}
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height, this.upperTurretPosition.x, this.upperTurretPosition.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height);
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height, this.lowerTurretPosition.x, this.lowerTurretPosition.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height);
	}

	update(){
		let keyPressed = keyPressed || UserInput.getKeyPressed();

		this.upperTurretPosition = {
			x: this.ship.position.x,
			y: this.getBoundingBox().top - this.ship.turretVerticalPositionOffset - this.ship.weapon.turrets.height
		};
		this.lowerTurretPosition = {
			x: this.ship.position.x,
			y: this.getBoundingBox().bottom + this.ship.turretVerticalPositionOffset
		};

		this.draw();

		if(this.ship.isFiring){
			this.shoot(this.upperTurretPosition, this.ship.weaponConfig);
			this.shoot(this.lowerTurretPosition, this.ship.weaponConfig);
		}
	}
}