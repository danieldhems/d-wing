import Move from './move';

class Stage {
	constructor(options){

		this.HTMLElement = 'div';
		this.stage = null;

		this.config = {
			hasInitialized: false,
			boundingBox: {
				top: 0,
				right: window.innerWidth,
				bottom: window.innerHeight,
				left: 0 
			},
			scrollProgress: 0,
			isScrolling: false
		}

		this.charactersOnStage = [];
	}

	_setConfig(options){
		Object.assign(this.config, options);
	}

	initialize(){
		this._setConfig({
			hasInitialized: true,
			isScrolling: true
		});

		let stageElement = document.createElement(this.HTMLElement);
		this.stage = document.body.appendChild(stageElement);

	}

	// Add a new instance of a character to the stage 
	add(character){
		this.stage.appendChild(character.element);
		character.setInitialPosition();
		this.charactersOnStage.push(character);
	}

	remove(character){
		this.stage.element.removeChild('#'+character.elementID);
		this.charactersOnStage.splice(this.charactersOnStage.findIndex(x=>x['id']===character['id']),1);
	}

	getCharactersOnStage(){
		return this.charactersOnStage;
	}
}

export default new Stage();
