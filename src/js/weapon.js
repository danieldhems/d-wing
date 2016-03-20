import CharacterDefaults from './character-defaults';
import Character from './character';
import Move from './move';
import Vector2 from './vector2';

export default class Weapon extends Character {
	constructor(options){
		super(options);

		Object.assign(this, options);
		this.timeSignature = new Date().getTime();
		this.element = document.createElement('i');
		this.element.id = 'w'+this.timeSignature;

		this.target = document.querySelector('#player');

		this.hasCollision = this.hasCollision.bind(this);
		this.move = new Move(this);

		if(this.target){
			this.targetCoords = {
				x: parseInt(this.target.style.left),
				y: parseInt(this.target.style.top),
			};

			this.vector = this.getVector(this.targetCoords);
			this.magnitude = Math.sqrt((this.deltaX*this.deltaX)+(this.deltaY*this.deltaY));
		}
	}

	fire(){
		this.spawn(this.element, this.ship.element);
		this.setInitialPosition(this.ship.element.offsetLeft, this.ship.element.offsetTop);
		this.setStyles(this.styleRules);
		this.startInterval();
	}

	// Calculate vector to target
	getVector(target){
		this.startVector = new Vector2(this.coords.x, this.coords.y);
		this.targetVector = new Vector2(target.x, target.y);
		return this.targetVector.subtract(this.startVector).getNormalized();
	}

	_getDistanceToTarget(target){
		let x = this.coords.x - target.offsetLeft;
		let y = this.coords.y - target.offsetTop;
		return Math.sqrt(Math.sqr(x)+Math.sqr(y));
	}

	_getAngleToTarget(target){
		let x = target.offsetLeft - this.coords.x;
		let y = target.offsetTop - this.coords.y;
		return Math.atan2(y,x);
	}

	setInitialPosition(x,y){
		if(x&&y){
			this.setStyles({'left':x+'px','top':y+'px'})
		} else {
			this.element.style.position = 'absolute';
			this.element.style.top = window.innerHeight / 2 - this.height/2 + 'px'
			this.element.style.left = '20px';
			this.coords = {
				x: 20,
				y: window.innerHeight / 2 - this.height/2
			}
		}
	}

	startInterval(){
		this.intervalID = setInterval( () => {
			this.tick();
		}, 16);
		this.addToIntervals(this.intervalID);
	}

	getDamage(){
		return this.damage;
	}

	destroy(){
		this.element.parentNode.removeChild(document.querySelector('#'+this.element.id));
		clearInterval(this.intervalID);
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