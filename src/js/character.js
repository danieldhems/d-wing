import CharacterConfig from './character-config';
import Scene from './scene';
import UserInputConfig from './user-input-config';

export default class Character {
	constructor(){
		this.intervalID = null;
		this.canvas = document.querySelector('#scene');
		this.ctx = this.canvas.getContext('2d');
		this.id = Date.now();

		this.sprite = new Image();
		this.sprite.src = './sprite.png';
		
	}

	setVelocity(velocity){
		this.velocity = velocity;
	}

	setPosition(position){
		this.position = {x:position.x,y:position.y};
	}

	getSpriteCoords(){
		let index = this.currentSpriteStep;
		this.currentSpriteStep = this.currentSpriteStep===this.spriteArray.length-1?0:this.currentSpriteStep+1;
		return this.spriteArray[index];
	}

	getBoundingBox(){
		return {
			top: this.position.y,
			right: this.position.x + this.width,
			bottom: this.position.y + this.height,
			left: this.position.x,
		}
	}

	getCenter(){
		let boundingBox = this.getBoundingBox();
		return {
			x: boundingBox.left + this.width/2,
			y: boundingBox.top + this.height/2
		}
	}

	isLeavingGameArea(direction){

		let boundaryConditions = {
			top: this.getBoundingBox().top < 0,
			right: this.getBoundingBox().right > this.canvas.width,
			bottom: this.getBoundingBox().bottom > this.canvas.height,
			left: this.getBoundingBox().left < 0
		}

		if(direction){
			switch(direction){
				case 'top':
					return boundaryConditions.top;
				case 'right':
					return boundaryConditions.right;
				case 'bottom':
					return boundaryConditions.bottom;
				case 'left':
					return boundaryConditions.left;
			}
		} else {
			return boundaryConditions.top || boundaryConditions.right || boundaryConditions.bottom || boundaryConditions.left;
		}
	}

	hasCollision(target){
		/**
		*	Big thanks to this fiddle for the logic
		*	http://jsfiddle.net/knam8/
		*/
		return (
			this.getBoundingBox().right > target.getBoundingBox().left
			&&
			this.getBoundingBox().left < target.getBoundingBox().right
			&& 
			this.getBoundingBox().top < target.getBoundingBox().bottom
			&&
			this.getBoundingBox().bottom > target.getBoundingBox().top
		)
	}

	getCollisionCandidates(keyMap){
		return Scene.getCharactersInScene().filter(c=>{
			for(let key in keyMap){
				return keyMap[key] === c[key];
			}
		})
	}

	hasCollisions(targets){
		let collision = false;
		targets.map( target => {
			if(this.hasCollision(target)){
				collision = true;
			}
		});
		return collision;
	}

	destroy(){
		Scene.removeCharacter(this.id);
	}
}