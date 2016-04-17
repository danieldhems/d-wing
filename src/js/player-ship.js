import CharacterConfig from './character-config';
import Ship from './ship';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';
import Move from './move';
import Scene from './scene';
import UpperTurret from './upper-turret';
import LowerTurret from './lower-turret';

export default class PlayerShip extends Ship {
	constructor(options){
		super(options);

		Object.assign(this, CharacterConfig.PlayerShip)

		this.id = Date.now();
		this.isFiring = false;

		this.position = {
			x: 50,
			y: this.canvas.height/2-this.height/2,
		};

		this.getWeaponConfig = this.getWeaponConfig.bind(this);
		this.weaponConfig = this.getWeaponConfig(this.type, 0);
		this.setVelocity(6);
		this.turretsDeployed = false;
	}

	upgradeWeapon(level){
		this.weaponConfig = this.getWeaponConfig(this.type, level);
		if(this.weaponConfig.turrets && !this.turretsDeployed){
			this.deployTurrets(this.weaponConfig)
			this.turretsDeployed = true;
		}
	}

	deployTurrets(weaponConfig){
		Scene.addCharacter(new UpperTurret(weaponConfig));
		Scene.addCharacter(new LowerTurret(weaponConfig));
	}

	pickUp(item){
		this.upgradeWeapon(item.level);
	}

	draw(){
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	update(){

		this.isFiring = false;

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
			this.shoot({x: this.getBoundingBox().right + 2, y: this.getBoundingBox().top + this.height/2 - this.weaponConfig.ammunition.height/2}, this.weaponConfig.ammunition);
			this.isFiring = true;
		}

		const collisionCandidates = this.getCollisionCandidatesByType(['powerup','Bullet']);
		collisionCandidates.map( c => {
			switch(c.type){
				case 'powerup':
					if(this.hasCollision(c)){
						this.pickUp(c);
						Scene.removeCharacter(c.id);
					}						
					break;
				case 'Bullet':
					if(this.hasCollision(c)){
						this.takeDamage(c);
						Scene.removeCharacter(c.id);
					}
					break;
			}
		})

		this.draw();
	}

}
