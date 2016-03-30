import CharacterDefaults from './character-defaults';
import Ship from './ship';
import Weapon from './weapon';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';
import Move from './move';
import Scene from './scene';

export default class PlayerShip extends Ship {
	constructor(options){
		super(options);

		this.health = 1;

		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;
		this.type = 'player';
		this.position = {
			x: 50,
			y: this.canvas.height/2-this.height/2,
		};

		this.setWeapon(CharacterDefaults.Weapons.Player[0]);
		this.setVelocity(6);
		this.update = this.update.bind(this);
		this.draw = this.draw.bind(this);
	}

	setWeapon(options){
		Object.assign(options,{
			source:this.type,
			spawnTarget:this.element
		})
		this.weapon = new Weapon(options);
	}

	pickUp(item){

	}

	draw(){
		this.ctx.drawImage(this.sprite, 10, 10, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	update(){
		let keysDown = UserInput.getKeysDown();
		let keyPressed = keyPressed || UserInput.getKeyPressed();

		if(keysDown.length>0){
			if(keysDown.find(x=>x===UserInputConfig.left)){
				if(!this.isLeavingGameArea('left')) Move(this).left();
			}
			if(keysDown.find(x=>x===UserInputConfig.right)){
				if(!this.isLeavingGameArea('right')) Move(this).right();
			}
			if(keysDown.find(x=>x===UserInputConfig.up)){
				if(!this.isLeavingGameArea('top')) Move(this).up();
			}
			if(keysDown.find(x=>x===UserInputConfig.down)){
				if(!this.isLeavingGameArea('bottom')) Move(this).down();
			}
		}

		if(keyPressed !== null && keyPressed===UserInputConfig.shoot){
			let origin = this.position;
			this.weapon.fire(origin);
		}

		this.draw();
	}

}
