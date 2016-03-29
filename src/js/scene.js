class Scene {
	constructor(options){

		this.canvas = document.querySelector('#scene');
		this.ctx = this.canvas.getContext('2d');

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

	initialize(){
		Object.assign(this, {
			hasInitialized: true,
			isScrolling: true
		});
	}

	clear(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}

	addCharacter(character){
		this.charactersInScene.push(character);
	}

	getCharactersInScene(){
		return this.charactersInScene;
	}

	removeCharacter(character){
		this.charactersInScene.splice(this.charactersInScene.findIndex(x=>x['id']===character['id']),1);
	}
}

export default new Scene();