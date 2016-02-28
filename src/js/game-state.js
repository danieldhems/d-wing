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
		this._safeTimeout = 3000;
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
				console.log(keysDown)
		Stage.charactersOnStage.map( character => {
			if(UserInput.keysDown.length>0){
				UserInput.keysDown.map(key=>{
					switch(key){
						case UserInputConfig.left:
							Move(character).left();
							break;
						case UserInputConfig.right:
							Move(character).right();
							break;
						case UserInputConfig.up:
							Move(character).up();
							break;
						case UserInputConfig.down:
							Move(character).down();
							break;
					}
				})
			}
		})
		if(this._elapsedTime>this._safeTimeout) this.stopTime();
		this._elapsedTime = new Date().getTime() - this._initialTime;
	}	
}

export default new GameState();
