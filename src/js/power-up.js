import Character from './character';
import CharacterConfig from './character-config';
import Scene from './scene';

export default class PowerUp extends Character {
	constructor(options){
		super(options);
		Object.assign(this,options,CharacterConfig.PowerUps[0]);
		console.log(this)
	}

	draw(){
		this.ctx.drawImage(this.sprite, this.spriteCoords.x, this.spriteCoords.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}

	update(){
		this.draw()
	}
}