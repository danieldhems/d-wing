import UserInputConfig from './user-input-config';

class UserInput {
	constructor(options){
		this.keysDown = [];
		this.bindKeyDown();
		this.bindKeyUp();
	}

	bindKeyDown(){
		window.addEventListener('keydown', e =>{
			for(let key in UserInputConfig){
				if(e.keyCode===UserInputConfig[key]) this.keysDown.push(e.keyCode);
			}
		})
	}

	bindKeyUp(){
		window.addEventListener('keyup', e => {
			this.keysDown = [];
		})
	}

	getKeysDown(){
		return this.keysDown;
	}
}

export default new UserInput();
