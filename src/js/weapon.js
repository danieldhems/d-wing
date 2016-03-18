import CharacterDefaults from './character-defaults';
import Character from './character';
import Move from './move';
import Vector2 from './vector2';

export default class Weapon extends Character {
	constructor(options){
		super(options);

		Object.assign(this, CharacterDefaults.Weapons.Enemy[0]);
		Object.assign(this, options);
		this.element = document.createElement(this.HTMLElement);
		this.timeSignature = new Date().getTime();
		this.element.id = 'w'+this.timeSignature;

		this.target = options.target;

		this.velocity = 16;
		this.move = new Move(this);

		this.setInitialPosition(this.coords);
		this.setStyles(this.styleRules);
		this.spawn(this.element, this.spawnTarget);
		this.startInterval();

		this.hasCollision = this.hasCollision.bind(this);

		this.targetCoords = {
			x: this.target.element.offsetLeft,
			y: this.target.element.offsetTop,
		};
		
		this.startVector = new Vector2(this.coords.x, this.coords.y);
		this.targetVector = new Vector2(this.targetCoords.x, this.targetCoords.y);
		this.direction = this.targetVector.subtract(this.startVector).getNormalized();

		this.magnitude = Math.sqrt((this.deltaX*this.deltaX)+(this.deltaY*this.deltaY));
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

	setInitialPosition(coords=null){
		if(coords!==null){
			this.setStyles({'left':coords.x+'px','top':coords.y+'px'})
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

	tick(){

		// Who fired this weapon?
		switch(this.ship.characterType){
			case 'player':
				this.move.right();
				if(window.DWing && window.DWing.hasOwnProperty('ships') && window.DWing.ships.length>0){
					window.DWing.ships.forEach( ship => {
						if(ship.characterType==='enemy' && this.hasCollision(ship)){
							ship.takeDamage(this.hitPoints);
							this.destroy();
							clearInterval(this.intervalID);
						}
					})
				}
				break;
			case 'enemy':
				this.element.style.top = parseInt(this.element.style.top) + (this.direction.y * 4) + 'px';
				this.element.style.left = parseInt(this.element.style.left) + (this.direction.x * 4) + 'px';
				break;
		}
		
		if(this.isOffScreen()){
			clearInterval(this.intervalID);
			this.destroy();
		}
	}

	destroy(){
		this.element.parentNode.removeChild(document.querySelector('#'+this.element.id));
	}
}