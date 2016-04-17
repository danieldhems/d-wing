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
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	// Calculate vector to target
	getVector(target){
		this.startVector = new Vector2(this.position.x, this.position.y);
		this.targetVector = new Vector2(target.position.x, target.position.y);
		// console.log(this.startVector, this.targetVector)
		return this.targetVector.subtract(this.startVector).getNormalized();
	}

	update(){
		
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

		if(this.isLeavingGameArea()){
			Scene.removeCharacter(this.id);
		} else {
			this.draw();
		}
	}
}
