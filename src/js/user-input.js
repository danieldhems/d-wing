import UserInputConfig from './user-input-config';

class UserInput {
	constructor(options){
		this.keysDown = [];
		this.keyPressed = null;
		this.bindKeyDown();
		this.bindKeyUp();
		this.bindKeyPress();
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

	bindKeyPress(){
		window.addEventListener('keypress', e => {
			this.keyPressed = e.keyCode;
		})
	}

	getKeysDown(){
		return this.keysDown;
	}

	getKeyPressed(){
		let keyPressed = this.keyPressed;
		this.keyPressed = null;
		return keyPressed;
	}
}

export default new UserInput();
