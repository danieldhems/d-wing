import CharacterConfig from './character-config';
import Character from './character';
import Move from './move';

export default class Turret extends Character {
	constructor(options){
		super(options);
		this.hasDeployed = false;
		Object.assign(this,options);
		this.type = 'turret';
		console.log(this);
	}

	draw(){
		console.log('drawing turret')
			this.ctx.drawImage(this.sprite, this.weapon.turrets.spriteCoords.x, this.weapon.turrets.spriteCoords.y, this.weapon.turrets.width, this.weapon.turrets.height, this.upperTurretPosition.x, this.upperTurretPosition.y, this.weapon.turrets.width, this.weapon.turrets.height);
			this.ctx.drawImage(this.sprite, this.weapon.turrets.spriteCoords.x, this.weapon.turrets.spriteCoords.y, this.weapon.turrets.width, this.weapon.turrets.height, this.lowerTurretPosition.x, this.lowerTurretPosition.y, this.weapon.turrets.width, this.weapon.turrets.height);
			this.hasDeployed = true;
	}

	update(){
		this.upperTurretPosition = {
			x: this.source.position.x,
			y: this.source.getBoundingBox().top - this.source.turretVerticalPositionOffset - this.weapon.turrets.height
		};
		this.lowerTurretPosition = {
			x: this.source.position.x,
			y: this.source.getBoundingBox().bottom + this.source.turretVerticalPositionOffset
		};
		this.draw();
	}
}