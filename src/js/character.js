import CharacterDefaults from './character-defaults';
import Scene from './scene';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';

export default class Character {
	constructor(options){
		this.element = document.createElement('i');
		this.intervalID = null;
		this.defaultStyles = {
			backgroundImage: 'url(./sprite-clear.gif)',
			position: 'fixed',
			display: 'block'
		}
		this.coords = {};
	}

	set(obj){
		Object.assign(this, obj);
	}

	startInterval(intervalID, fn){
		intervalID = setInterval( () => {
			fn();
		},1);
		console.log('interval started', intervalID)
		this.addToIntervals(intervalID)
	}

	_setStyle(selector, style){
		this.element.style[selector] = style;
	}

	setStyles(styleMap){
		let styles = Object.assign(this.defaultStyles, styleMap);
		for(let style in styles){
			this._setStyle(style, styles[style]);
		};
	}

	addToIntervals(intervalID){
		window.DWingIntervals.push(intervalID)
	}

	setInitialPosition(options){}

	setPosition(x, y){
		this.element.style.left = x + 'px';
		this.element.style.top = y + 'px';
	}

	setVelocity(velocity){
		this.velocity = velocity;
	}

	spawn(element, target){
		if(target instanceof HTMLElement){
			target.appendChild(element);
		} else {
			document.querySelector(target).appendChild(element);
		}
	}

	clone(){
		let clone = document.createElement(this.HTMLElement);
		this.element.parentNode.appendChild(clone);
		clone.id = "w"+Date.now();
		return clone
	}

	boundingBox(){
		return {
			top: this.element.offsetTop,
			right: this.element.offsetLeft + this.element.offsetWidth,
			bottom: this.element.offsetTop + this.element.offsetHeight,
			left: this.element.offsetLeft
		}
	}

	isOffScreen(){
		return this.boundingBox().top < 0 || this.boundingBox().right > window.innerWidth || this.boundingBox().bottom > window.innerHeight || this.boundingBox().left < 0;
	}

	hasCollision(target){
		/**
		*	Big thanks to this fiddle for the logic
		*	http://jsfiddle.net/knam8/
		*/
		return (
			(
				this.boundingBox().right > target.boundingBox().left
				&&
				this.boundingBox().left < target.boundingBox().right
				&& 
				this.boundingBox().top < target.boundingBox().bottom
				&&
				this.boundingBox().bottom > target.boundingBox().top
			)
		)
	}
}