import Character from './character';
import Scene from './scene';
import Vector2 from './vector2';

export default class Bullet extends Character {
	constructor(options){
		super(options);
		Object.assign(this, options);
		// console.log(options)

		this.id = Date.now();

		if(this.target) this.vector = this.getVector(this.target);
	}

	draw(){
		console.log('drawing bullet', this)
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
		let collisionKeyMap = {
			type: this.source==='player'?'enemy':'player'
		};
		let collisionCandidates = this.getCollisionCandidates(collisionKeyMap);
		switch(this.source.type){
			case 'player':
				this.position = {
					x: this.position.x + this.velocity,
					y: this.position.y
				}
				break;
			case 'enemy':
				if(this.isHoming){
					this.vector = this.getVector(this.target);
				} 
				this.position = {
					x: this.position.x + this.vector.x * this.velocity,
					y: this.position.y + this.vector.y * this.velocity
				}
				break;
		}

		if(this.isLeavingGameArea() || this.hasCollisions(collisionCandidates)){
			this.destroy()
		} else {
			this.draw();
		}
	}
}
