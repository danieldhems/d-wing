import CharacterDefaults from './character-defaults';
import Ship from './ship';
import Weapon from './weapon';
import Move from './move';
import Utils from './utils'
;
window.DWing = window.DWing || {};
window.DWing.ships = window.DWing.ships || [];

class EnemyShip extends Ship {
	constructor(options){
		super(options);

		Object.assign(this, CharacterDefaults.EnemyShips[0]);
		Object.assign(this, options);

		this.move = new Move(this);

		this.characterType = 'enemy';
		this.health = 3;
		this.element = document.createElement(CharacterDefaults.Ship.HTMLElement);
		this.element.id = 's'+ new Date().getTime();

		this.intervalID = new Date().getTime();
		this.elapsed = 0;

		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;

		this.coords = {
			x:0,
			y:0
		};

		this.setDimensions();
		this.setStyles(CharacterDefaults.PlayerShip.styleRules);
		this.spawn(this.element, '#main');
		this.setInitialPosition({x: window.innerWidth / 2,y:window.innerHeight/2});
		this.startInterval(this.intervalID, this.tick.bind(this));
	
		window.DWing.ships.push(this);
	}

	setDimensions(){
		this.element.style.width = CharacterDefaults.PlayerShip.width + 'px';
		this.element.style.height = CharacterDefaults.PlayerShip.height + 'px';
	}

	setInitialPosition(){
		this.element.style.position = 'fixed';
		this.element.style.top = window.innerHeight/2 + 'px';
		this.element.style.left = window.innerWidth/2 + 'px';
		this.coords = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
	}

	shoot(){
		this.weapon = new Weapon({
			ship:this,
			coords:{
				x:parseInt(this.element.style.left)+parseInt(this.element.style.width)/2,
				y:parseInt(this.element.style.top)+parseInt(this.element.style.height)/2
			},
			target: window.DWing.ships[0],
			spawnTarget:this.element
		});
	}

	tick(){
		if(this.elapsed >= this.fireRate){
			this.shoot();
			this.elapsed = 0;
		} else {
			this.elapsed++;
		}
	}

	destroy(){
		this.element.parentNode.removeChild(document.querySelector('#'+this.element.id));
		clearInterval(this.intervalID);
	}
}

export default new EnemyShip();
