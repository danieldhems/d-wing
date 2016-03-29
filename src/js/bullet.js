import CharacterDefaults from './character-defaults';
import Character from './character';
import Scene from './scene';

export default class Bullet extends Character {
	constructor(options){
		super(options);
		Object.assign(this, options);
		this.type = 'bullet';
		this.velocity = 10;
		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;

	}

	getCollisionCandidates(){
		return Scene.getCharactersInScene().filter(c=>{
			switch(this.source){
				case 'player':
					return c.type === 'enemy';
				case 'enemy':
					return c.type === 'player';
			}
		})
	}

	checkCollisions(candidates){
		let collision = false;
		candidates.map( candidate => {
			if(this.hasCollision(candidate)){
				collision = true;
			}
		});
		return collision;
	}

	draw(){
		this.ctx.drawImage(this.sprite, 10, 10, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	destroy(){
		Scene.removeCharacter(this);
	}

	update(){
		let collisionCandidates = this.getCollisionCandidates();
		switch(this.source){
			case 'player':
				if(!this.isLeavingGameArea().right){
					this.position.x = this.position.x + this.velocity;
					if(this.checkCollisions(collisionCandidates)){
						this.destroy()
					} else {
						this.draw();
					}
				} else {
					this.destroy()
				}
				break;
			case 'enemy':
				break;
		}
	}
}
