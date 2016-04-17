import CharacterConfig from './character-config';
import Ship from './ship';
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

		this.weaponConfig = this.getWeaponConfig(this.type, 0);
		this._lastShotFired = Date.now();
	}

	update(){
		
		const collisionCandidates = this.getCollisionCandidatesByType('Bullet');
		
		let delta = Date.now() - this._lastShotFired;
		if(delta > this.fireRate){
			const position = {
				x: this.getBoundingBox().left - 10,
				y: this.getBoundingBox().top + this.height/2
			};
			this.shoot(position, this.weaponConfig.ammunition, Scene.getCharactersInScene()[0]);
			this._lastShotFired = Date.now();
		}

		collisionCandidates.map( candidate => {
			if(this.hasCollision(candidate)){
				this.takeDamage(candidate.damage);
				if(this.health===0){
					Scene.removeCharacter(candidate.id);
				}
			}
		});

		this.draw();
	}

	draw(){
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}
}
