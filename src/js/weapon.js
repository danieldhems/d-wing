import CharacterDefaults from './character-defaults';
import Character from './character';
import Move from './move';

export default class Weapon extends Character {
	constructor(options){
		super(options);
		this.intervalID = new Date().getTime();

		Object.assign(this, CharacterDefaults.Weapons[0], options);
		this.element = document.createElement(this.HTMLElement);
		this.element.id = 'w'+this.timeSignature;
		this.move = new Move(this);

		this.velocity = 5;
		this.setInitialPosition(this.coords);
		this.setStyles(this.styleRules);
		this.spawn(this.element, this.spawnTarget);
		this.startInterval(this.intervalID, this.tick.bind(this));

		this.hasCollision = this.hasCollision.bind(this);
	}

	setInitialPosition(coords=null){
		if(coords!==null){
			this.setStyles({'left':coords.x+'px',top:coords.y+'px'})
			this.coords = coords;
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
		},1);
		this.addToIntervals(this.intervalID);
	}

	getDamage(){
		return this.damage;
	}

	tick(){
		this.move.right(this.coords);

		if(window.DWing && window.DWing.hasOwnProperty('ships') && window.DWing.ships.length>0){
			window.DWing.ships.forEach( ship => {
				if(ship.characterType==='enemy' && this.hasCollision(ship)){
					ship.takeDamage(this.hitPoints);
					this.destroy();
					clearInterval(this.intervalID);
				}
			})
		}

		if(parseInt(this.element.style.left) > window.innerWidth){
			clearInterval(this.intervalID);
			this.destroy();
		}
	}

	destroy(){
		this.element.parentNode.removeChild(document.querySelector('#'+this.element.id));
	}
}