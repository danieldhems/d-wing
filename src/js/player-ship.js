import CharacterConfig from './character-config';
import Ship from './ship';
import Weapon from './weapon';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';
import Move from './move';
import Scene from './scene';
import Turrets from './turrets';

export default class PlayerShip extends Ship {
	constructor(options){
		super(options);

		Object.assign(this, CharacterConfig.PlayerShip)

		this.id = Date.now();

		this.position = {
			x: 50,
			y: this.canvas.height/2-this.height/2,
		};

		this.setWeaponConfig = this.setWeaponConfig.bind(this);
		this.setWeaponConfig(this, this.currentWeaponLevel);
		this.setVelocity(6);
	}

	upgradeWeapon(level){
		this.setWeaponConfig(this, level);
		if(this.weapon.turrets){
			this.deployTurrets(this.weapon)
		}
	}

	deployTurrets(weapon){
		Scene.addCharacter(new Turrets({source:this,weapon}));
	}

	pickUp(item){
		this.upgradeWeapon(item.level);
		console.log(this.weapon)
	}

	draw(){
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
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
			if(keysDown.find(x=>x===UserInputConfig.shoot)){
				// this.shoot()
			}
		}

		if(keyPressed !== null && keyPressed===UserInputConfig.shoot){
			let origin = {
				x: this.getBoundingBox().right,
				y: this.getBoundingBox().top + this.height/2
			};
			this.weapon.fire(origin);
		}

		let collisionCandidates = this.getCollisionCandidates({type:'powerup'});
		collisionCandidates.map( c => {
			if(this.hasCollisions(collisionCandidates)){
				this.pickUp(c);
				c.destroy()
			}
		})

		this.draw();
	}

}
