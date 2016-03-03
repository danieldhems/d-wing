import CharacterDefaults from './character-defaults';
import Ship from './ship';
import Weapon from './weapon';
import Move from './move';

window.DWing = window.DWing || {};
window.DWing.ships = window.DWing.ships || [];

class EnemyShip extends Ship {
	constructor(options){
		super(options);

		this.move = new Move(this);

		this.characterType = 'enemy';
		this.isSpawned = true;
		this.shield = {};
		this.health = 3;
		this.element = document.createElement(CharacterDefaults.Ship.HTMLElement);
		this.element.id = 's'+ new Date().getTime();

		this.intervalID = new Date().getTime();

		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;

		this.coords = {
			x:0,
			y:0
		};

		this.setDimensions();
		this.setStyles(CharacterDefaults.PlayerShip.styleRules);
		this.spawn(this.element, '#main');
		this.setInitialPosition();
		this.startInterval(this.intervalID, this.tick.bind(this));
	
		window.DWing.ships.push(this);
	}

	setDimensions(){
		this.element.style.width = CharacterDefaults.PlayerShip.width + 'px';
		this.element.style.height = CharacterDefaults.PlayerShip.height + 'px';
	}

	setInitialPosition(){
		this.element.style.position = 'absolute';
		this.element.style.top = window.innerHeight / 2 - this.height/2 + 'px'
		this.element.style.left = (window.innerWidth - 100) + 'px';
		this.coords = {
			x: window.innerWidth - 100,
			y: window.innerHeight / 2 - this.height/2
		}
	}

	tick(){

	}

	destroy(){
		this.element.parentNode.removeChild(document.querySelector('#'+this.element.id));
		clearInterval(this.intervalID);
	}
}

export default new EnemyShip();
