import GameStateDefaults from './game-state-defaults';
import Move from './move';
import UserInputConfig from './user-input-config';
import PlayerShip from './player-ship';
import UserInput from './user-input';
import Stage from './stage';

class GameState {
	constructor(){
		this._interval = null;
		this._initialTime = null;
		this._elapsedTime = 0;
		this._safeTimeout = 20000;
	}

	initialize(){
		Stage.initialize();
		Stage.add(new PlayerShip());
		this.startTime();
	}

	startTime(){
		this._initialTime = new Date().getTime();
		console.log('Game started at ', new Date());
		this._interval = setInterval(()=>{
			this.tick();
		}, GameStateDefaults.tickInterval);
	}

	stopTime(){
		console.log('Game stopped at ', new Date());
		clearInterval(this._interval);
	}

	tick(){
		let keysDown = UserInput.getKeysDown();
		Stage.charactersOnStage.map( character => {
			if(keysDown.length>0){
				if(keysDown.find(x=>x===UserInputConfig.left)){
					Move(character).left();
				}
				if(keysDown.find(x=>x===UserInputConfig.right)){
					Move(character).right();
				}
				if(keysDown.find(x=>x===UserInputConfig.up)){
					Move(character).up();
				}
				if(keysDown.find(x=>x===UserInputConfig.down)){
					Move(character).down();
				}
			}
		})
		if(this._elapsedTime>this._safeTimeout) this.stopTime();
		this._elapsedTime = new Date().getTime() - this._initialTime;
	}	
}

export default new GameState();
