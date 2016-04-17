import Ship from './ship';
import Scene from './scene';
import Bullet from './bullet';

export default class LowerTurret extends Ship {
	constructor(options){
		super(options)
		Object.assign(this, options);
		this.type = 'Lower Turret';
		this.source = Scene.getCharactersInScene()[0];


		this.deploymentProgress = 0;
		this.deploymentComplete = false;

		this.spriteArray = this.turrets.spriteCoords;
		this.currentSpriteStep = 0;
		this._lastSpriteFrame = Date.now();
		this.spriteCoords = this.getSpriteCoords();

		this.position = {
			x: this.source.getBoundingBox().left,
			y: this.source.getBoundingBox().top
		}

		// console.log(this)
	}

	getPosition(){
		if(this.deploymentComplete){
			return {
				x: this.source.getBoundingBox().left,
				y: this.source.getBoundingBox().top + this.turrets.height + this.source.turretVerticalPositionOffset
			}
		} else {
			this.deploymentProgress += this.turrets.deploymentRate;
			if(this.deploymentProgress >= this.source.height + this.source.turretVerticalPositionOffset) this.deploymentComplete = true;
			return {
				x: this.source.getBoundingBox().left,
				y: this.source.getBoundingBox().top + this.deploymentProgress
			}
		}
	}

	draw(){
		// Throttle sprite animation i.e. rotating turret effect
		if(Date.now() - this._lastSpriteFrame > this.turrets.animRate){
			this._lastSpriteFrame = Date.now();
			// Get coords for next frame in turret rotation sequence from this.spriteArray
			this.spriteCoords = this.getSpriteCoords();
		}
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.turrets.width, this.turrets.height, this.position.x, this.position.y, this.turrets.width, this.turrets.height);
	}

	update(){

		this.position = this.getPosition();
		this.draw();

		if(this.source.isFiring){
			const origin = {
				x: this.position.x + this.turrets.width + 2,
				y: this.position.y + this.turrets.height/2 - this.ammunition.height/2
			};
			this.shoot(origin, this.ammunition);
		}
	}
}
