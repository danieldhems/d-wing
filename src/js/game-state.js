import GameStateDefaults from './game-state-defaults';
import UserInputConfig from './user-input-config';
import UserInput from './user-input';
import PlayerShip from './player-ship';
import EnemyShip from './enemy-ship';
import Scene from './scene';
import Debug from './debug';

class GameState {
	constructor(){
		this._lastUpdate = Date.now();
		this._startTime = Date.now();
		this.gameRunning = false;
		this.update = this.update.bind(this);
	}

	initialize(){
		Scene.initialize();
		Scene.addCharacter(new PlayerShip());
		Scene.addCharacter(new EnemyShip());
		this.start();
	}

	start(){
		this.gameRunning = true;
	 	requestAnimationFrame(this.update);
	}

	stop(){
		this.gameRunning = false;
	}

	update(){
		Scene.clear();

		let now = Date.now();
		if(now - this._startTime > 20000) this.stop();

		let delta = now - this._lastUpdate;
		this._lastUpdate = now;

		let charactersInScene = Scene.getCharactersInScene();
		// console.log(charactersInScene);
		charactersInScene.map( character => {
			character.update();
		});

		Debug.update();

		if(this.gameRunning) requestAnimationFrame(this.update);
	}	
}

export default new GameState();
