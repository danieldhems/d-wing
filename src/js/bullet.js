import CharacterDefaults from './character-defaults';
import Character from './character';
import Scene from './scene';
import Vector2 from './vector2';

export default class Bullet extends Character {
	constructor(options){
		super(options);
		Object.assign(this, options);
		this.type = 'bullet';
		this.velocity = 3;
		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;

		if(this.target) this.vector = this.getVector(this.target);
	}

	getCollisionCandidates(){
		return Scene.getCharactersInScene().filter(c=>{
			switch(this.source){
				case 'player':
					return c.type === 'enemy';
				case 'enemy':
					return c.type === 'player';
			}
		})
	}

	draw(){
		this.ctx.drawImage(this.sprite, 10, 10, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	// Calculate vector to target
	getVector(target){
		this.startVector = new Vector2(this.position.x, this.position.y);
		this.targetVector = new Vector2(target.position.x, target.position.y);
		// console.log(this.startVector, this.targetVector)
		return this.targetVector.subtract(this.startVector).getNormalized();
	}

	getNextPositionByVector(){
		let vector = this.getVector(this.target);
		this.position = {
			x: this.position.x + vector.x * this.velocity,
			y: this.position.y + vector.y * this.velocity
		}
	}

	update(){
		let collisionCandidates = this.getCollisionCandidates();
		switch(this.source){
			case 'player':
				this.position = {
					x: this.position.x + this.velocity,
					y: this.position.y
				}
				break;
			case 'enemy':
				if(this.isHoming){
					let vector = this.getVector(this.target);
					this.position = {
						x: vector.x * this.velocity,
						y: vector.y * this.velocity
					} 
				} else {
					this.position = {
						x: this.position.x + this.vector.x * this.velocity,
						y: this.position.y + this.vector.y * this.velocity
					}
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
