import UserInputConfig from './user-input-config';

class UserInput {
	constructor(options){
		this.keysDown = [];
		this.bindKeys()
	}

	bindKeys(){
		window.addEventListener('keydown', e =>{
			for(let key in UserInputConfig){
				if(e.keyCode===UserInputConfig[key]) this.keysDown.push(e.keyCode);
			}
		})
	}

	getKeysDown(){
		return this.keysDown;
	}
}

export default new UserInput();
