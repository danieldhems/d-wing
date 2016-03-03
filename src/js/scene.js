import Move from './move';

export default new class Scene {
	constructor(options){

		this.HTMLElement = 'div';

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

		this.charactersInScene = [];
	}

	_setConfig(options){
		Object.assign(this.config, options);
	}

	initialize(){
		this._setConfig({
			hasInitialized: true,
			isScrolling: true
		});

		let sceneElement = document.createElement(this.HTMLElement);
		this.sceneElement = document.body.appendChild(sceneElement);

	}

	remove(character){
		this.scene.element.removeChild('#'+character.elementID);
		this.charactersInScene.splice(this.charactersInScene.findIndex(x=>x['id']===character['id']),1);
	}

	getCharactersInScene(){
		return this.charactersInScene;
	}
}
