import Character from './character';
import Scene from './scene';
import Vector2 from './vector2';

export default class Bullet extends Character {
	constructor(options){
		super(options);
		Object.assign(this, options);

		this.id = Date.now();

		if(this.target) this.vector = this.getVector(this.target);
	}

	draw(){
		// console.log('drawing bullet', this)
		this.ctx.drawImage(this.sprite, this.ammunition.spriteCoords.x, this.ammunition.spriteCoords.y, this.ammunition.width, this.ammunition.height, this.position.x, this.position.y, this.ammunition.width, this.ammunition.height);
	}

	// Calculate vector to target
	getVector(target){
		this.startVector = new Vector2(this.position.x, this.position.y);
		this.targetVector = new Vector2(target.position.x, target.position.y);
		// console.log(this.startVector, this.targetVector)
		return this.targetVector.subtract(this.startVector).getNormalized();
	}

	update(){
		const collisionKeyMap = {
			type: this.target ? 'Player' : 'Enemy'
		};
		const collisionCandidates = this.getCollisionCandidates(collisionKeyMap);
		
		if(this.isHoming){
			this.vector = this.getVector(this.target);
		}

		if(this.target){
			this.position = {
				x: this.position.x + this.vector.x * this.velocity,
				y: this.position.y + this.vector.y * this.velocity
			}
		} else {
			this.position = {
				x: this.position.x + this.velocity,
				y: this.position.y
			}
		}

		if(this.isLeavingGameArea() || this.hasCollisions(collisionCandidates)){
			this.destroy();
		} else {
			this.draw();
		}
	}
}
