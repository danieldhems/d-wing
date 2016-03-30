import CharacterDefaults from './character-defaults';
import Scene from './scene';
import UserInputConfig from './user-input-config';

export default class Character {
	constructor(){
		this.intervalID = null;
		this.canvas = document.querySelector('#scene');
		this.ctx = this.canvas.getContext('2d');
		this.id = Date.now();

		this.sprite = new Image();
		this.sprite.src = './sprite-clear.gif';
	}

	setVelocity(velocity){
		this.velocity = velocity;
	}

	setPosition(position){
		this.position = {x:position.x,y:position.y};
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

	hasCollisions(targets){
		let collision = false;
		targets.map( target => {
			if(this.hasCollision(target)){
				collision = true;
			}
		});
		return collision;
	}

	debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	destroy(){
		Scene.removeCharacter(this);
	}
}