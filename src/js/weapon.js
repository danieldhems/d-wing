import CharacterDefaults from './character-defaults';
import Character from './character';
import Move from './move';
import Vector2 from './vector2';
import Scene from './scene';
import Bullet from './bullet';

export default class Weapon extends Character {
	constructor(options){
		super(options);

		Object.assign(this, options);

		this.hasCollision = this.hasCollision.bind(this);
		this.type = 'bullet';

		this.update = this.update.bind(this);
		this.draw = this.draw.bind(this);
		/*
		if(this.target){
			this.vector = this.getVector(this.target.getCenter());
			this.magnitude = Math.sqrt((this.deltaX*this.deltaX)+(this.deltaY*this.deltaY));
		}
		*/
	}

	fire(origin){
		let options = {
			source: this.source,
			position: {
				x: origin.x,
				y: origin.y
			}
		};
		Scene.addCharacter(new Bullet(options));
	}

	draw(){
		this.ctx.drawImage(this.sprite, 10, 10, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	update(delta){
		
	}

	// Calculate vector to target
	getVector(target){
		this.startVector = new Vector2(this.position.x, this.position.y);
		this.targetVector = new Vector2(target.x, target.y);
		return this.targetVector.subtract(this.startVector).getNormalized();
	}

	getDamage(){
		return this.damage;
	}

	destroy(){
		// this.element.parentNode.removeChild(document.querySelector('#'+this.element.id));
	}

	tick(){

		// Who fired this weapon?
		switch(this.ship.characterType){
			case 'player':
				let direction;
				if(this.isHoming){
					direction = this.getVector()
				} else {
					console.log(this.element.offsetLeft)
					this.move.right();
				}

				if(window.DWing && window.DWing.hasOwnProperty('ships') && window.DWing.ships.length>0){
					window.DWing.ships.forEach( ship => {
						if(ship.characterType==='enemy' && this.hasCollision(ship)){
							ship.takeDamage(this.hitPoints);
							this.destroy();
						}
					})
				}
				break;
			case 'enemy':
				this.element.style.top = parseInt(this.element.style.top) + (this.vector.y * 4) + 'px';
				this.element.style.left = parseInt(this.element.style.left) + (this.vector.x * 4) + 'px';
				break;
		}
		
		if(this.isOffScreen()){
			this.destroy();
		}
	}

}