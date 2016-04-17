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
		this._lastSpriteFrame = Date.now();
		this.spriteCoords = this.getSpriteCoords();

		this.upperTurretDeploymentProgress = 0;
		this.lowerTurretDeploymentProgress = 0;
		this.upperTurretDeploymentComplete = false;
		this.lowerTurretDeploymentComplete = false;

		this.getSpriteCoords = this.getSpriteCoords.bind(this);
		this._getUpperTurretPosition = this._getUpperTurretPosition.bind(this);
		this._getLowerTurretPosition = this._getLowerTurretPosition.bind(this);

		this.upperTurret = {
			id: 0,
			position: {
				x: this.ship.getBoundingBox().left,
				y: this.ship.getBoundingBox().top
			}
		};

		this.lowerTurret = {
			id: 1,
			position: {
				x: this.ship.getBoundingBox().left,
				y: this.ship.getBoundingBox().top
			}
		}
	}

	draw(){
		// Throttle sprite animation i.e. rotating turret effect
		if(Date.now() - this._lastSpriteFrame > this.ship.weapon.turrets.animRate){
			this._lastSpriteFrame = Date.now();
			// Get coords for next frame in turret rotation sequence from this.spriteArray
			this.spriteCoords = this.getSpriteCoords();
		}
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height, this.upperTurret.position.x, this.upperTurret.position.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height);
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height, this.lowerTurret.position.x, this.lowerTurret.position.y, this.ship.weapon.turrets.width, this.ship.weapon.turrets.height);
	}

	hasFullyDeployed(turret){
		// console.log(this.upperTurret.position.y, this.ship.getBoundingBox().top)
		switch(turret.id){
			case 0:
				return turret.position.y === this.ship.getBoundingBox().top - this.ship.turretVerticalPositionOffset - this.ship.weapon.turrets.height;
			case 1:
				return turret.position.y === this.ship.getBoundingBox().bottom + this.ship.turretVerticalPositionOffset
		}
	}

	_getUpperTurretPosition(){
		// console.log(this.hasFullyDeployed(this.upperTurret))
		if(this.upperTurretDeploymentComplete){
			return {
				x: this.ship.getBoundingBox().left,
				y: this.ship.getBoundingBox().top - this.ship.turretVerticalPositionOffset - this.ship.weapon.turrets.height
			}
		} else {
			this.upperTurretDeploymentProgress += this.ship.weapon.turrets.deploymentRate;
			if(this.upperTurretDeploymentProgress >= this.ship.turretVerticalPositionOffset + this.height) this.upperTurretDeploymentComplete = true;
			return {
				x: this.ship.getBoundingBox().left,
				y: this.ship.getBoundingBox().top - this.upperTurretDeploymentProgress
			}
		}
	}

	_getLowerTurretPosition(){
		if(this.lowerTurretDeploymentComplete){
			return {
				x: this.ship.getBoundingBox().left,
				y: this.ship.getBoundingBox().top + this.height + this.ship.turretVerticalPositionOffset
			}
		} else {
			this.lowerTurretDeploymentProgress += this.ship.weapon.turrets.deploymentRate;
			if(this.lowerTurretDeploymentProgress >= this.ship.height + this.ship.turretVerticalPositionOffset) this.lowerTurretDeploymentComplete = true;
			return {
				x: this.ship.getBoundingBox().left,
				y: this.ship.getBoundingBox().top + this.lowerTurretDeploymentProgress
			}
		}
	}

	update(){
		let keyPressed = keyPressed || UserInput.getKeyPressed();

		this.upperTurret.position = this._getUpperTurretPosition();
		this.lowerTurret.position = this._getLowerTurretPosition();

		this.draw();

		if(this.ship.isFiring){
			this.shoot(this.upperTurret.position, this.ship.weaponConfig);
			this.shoot(this.lowerTurret.position, this.ship.weaponConfig);
		}
	}
}