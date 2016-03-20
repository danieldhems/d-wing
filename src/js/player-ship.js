import CharacterDefaults from './character-defaults';
import Ship from './ship';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';
import Weapon from './weapon';
import Move from './move';

window.DWing = window.DWing || {};
window.DWing.ships = window.DWing.ships || [];

class PlayerShip extends Ship {
	constructor(options){
		super(options);

		this.move = new Move(this);

		this.characterType = 'player';
		this.isSpawned = true;
		this.shield = {};
		this.health = 1;
		this.element = document.createElement(CharacterDefaults.Ship.HTMLElement);

		this.intervalID = new Date().getTime();

		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;

		this.coords = {
			x:0, 
			y:0
		};

		this.element.id = 'player';

		this.setDimensions();
		this.setStyles(CharacterDefaults.PlayerShip.styleRules);
		this.spawn(this.element, '#main');
		this.setInitialPosition();

		this.setWeapon(CharacterDefaults.Weapons.Player[0]);
		this.startInterval(this.intervalID, this.tick.bind(this));

		window.DWing.ships.push(this);
	}

	setWeapon(options){
		Object.assign(options,{
			ship:this,
			spawnTarget:this.element
		})
		this.weapon = new Weapon(options);
	}

	setDimensions(){
		this.element.style.width = CharacterDefaults.PlayerShip.width + 'px';
		this.element.style.height = CharacterDefaults.PlayerShip.height + 'px';
	}

	setInitialPosition(){
		this.element.style.position = 'absolute';
		this.element.style.top = window.innerHeight / 2 - this.height/2 + 'px'
		this.element.style.left = '20px';
		this.coords = {
			x: 20,
			y: window.innerHeight / 2 - this.height/2
		}
	}

	getCoords(){
		return {
			x: this.boundingBox().left,
			y: this.boundingBox().top,
		}
	}

	shoot(){
		this.weapon.fire();
	}

	pickUp(item){

	}

	tick(){
		let keysDown = UserInput.getKeysDown();
		let keyPressed = keyPressed || UserInput.getKeyPressed();
		if(keysDown.length>0){
			if(keysDown.find(x=>x===UserInputConfig.left) && this.boundingBox().left > 0){
				this.move.left();
			}
			if(keysDown.find(x=>x===UserInputConfig.right) && this.boundingBox().right < window.innerWidth){
				this.move.right();
			}
			if(keysDown.find(x=>x===UserInputConfig.up) && this.boundingBox().top > 0){
				this.move.up();
			}
			if(keysDown.find(x=>x===UserInputConfig.down) && this.boundingBox().bottom < window.innerHeight){
				this.move.down();
			}
			if(keysDown.find(x=>x===UserInputConfig.shoot) && this.weapon.hasRapidFire){
				this.shoot();
			}
		}
		if(keyPressed !== null && keyPressed===UserInputConfig.shoot){
			this.shoot();
		}
	}

}

export default new PlayerShip();
