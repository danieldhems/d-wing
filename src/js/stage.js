import Move from './move';

export default class Stage {
	constructor(options){
		super(options);

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
	}

	_setConfig(options){
		Object.assign(this.config, options);
	}

	initialize(){
		this._setConfig({
			hasInitialized: true,
			isScrolling: true
		});

		this.stage = Character.create('stage');
		document.body.appendChild(this.stage.element);
	}

	// Add a new instance of a character to the stage 
	spawn(character){
		this.stage.element.appendChild(character.element);
	}

	remove(character){
		this.stage.element.removeChild('#'+character.elementID);
	}
}