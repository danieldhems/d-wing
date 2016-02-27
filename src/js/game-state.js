import GameStateDefaults from './game-state-defaults';

export default class GameState {
	constructor(options){
		super(options);
		this._interval = null;
	}

	initialize(){
		this._interval = setInterval(()={
			this.tick()
		}, GameStateDefaults.tickInterval);
	}

	tick(){

	}	
}