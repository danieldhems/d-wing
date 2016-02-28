import Move from './move';
import Ship from './ship';
import CharacterDefaults from './character-defaults';
import Bullet from './bullet';
// import Shield from './shield';
// import Collision from './collision';

export default class PlayerShip extends Ship {
	constructor(options){
		super(options);

		this.isSpawned = true;
		this.weapon = {};
		this.shield = {};
		this.health = 1;
		this.element = document.createElement(CharacterDefaults.Ship.HTMLElement);

		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;

		this.element.style.backgroundColor = '#000';

		this.velocity = 2.5;

		this.coords = {
			x:0,
			y:0
		};

		this.setDimensions();
	}

	setDimensions(){
		this.element.style.width = CharacterDefaults.PlayerShip.width + 'px';
		this.element.style.height = CharacterDefaults.PlayerShip.height + 'px';
	}

	setInitialPosition(){
		this.element.style.position = 'absolute';
		this.element.style.top = window.innerHeight / 2 - this.height/2 + 'px'
		this.element.style.left = '20px';
	}

	setPosition(axis, position){
		switch(axis){
			case 'x':
				this.coords['x'] = position;
				this.element.style.left = position + 'px';
				break;
			case 'y':
				this.coords['y'] = position;
				this.element.style.top = position + 'px';
				break;
		}
	}

	pickUp(item){

	}
}