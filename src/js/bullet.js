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

	draw(){
		this.ctx.drawImage(this.sprite, 10, 10, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	update(){
		switch(this.source){
			case 'player':
				if(!this.isLeavingGameArea().right){
					this.position.x = this.position.x + this.velocity;
					this.draw();
				} else {
					Scene.removeCharacter(this);
				}
				break;
			case 'enemy':
				break;
		}
	}
}
