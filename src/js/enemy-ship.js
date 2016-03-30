import CharacterDefaults from './character-defaults';
import Ship from './ship';
import Weapon from './weapon';
import Utils from './utils';
import Scene from './scene';

export default class EnemyShip extends Ship {
	constructor(options){
		super(options);

		Object.assign(this, CharacterDefaults.EnemyShips[0]);
		Object.assign(this, options);

		this.sprite = new Image();
		this.sprite.src = './sprite-clear.gif';

		this.type = 'enemy';
		this.health = 3;

		this.width = CharacterDefaults.PlayerShip.width;
		this.height = CharacterDefaults.PlayerShip.height;

		this.position = {
			x: 300,
			y: this.canvas.height/2-this.height/2
		};

		this.weapon = new Weapon({
			source: this.type,
			target: Scene.getCharactersInScene()[0]
		});

		this.update = this.update.bind(this);
		this._lastShotFired = Date.now();
		this._elapsed = 0;
	}

	update(elapsed){
		this.draw();
		let delta = Date.now() - this._lastShotFired;
		if(delta > 300){
			this.shoot();
			this._lastShotFired = Date.now();
		}
	}

	shoot(){
		this.weapon.fire(this.position);
	}

	draw(){
		this.ctx.drawImage(this.sprite, 10, 10, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	}
}
