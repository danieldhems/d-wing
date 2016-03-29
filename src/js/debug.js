import Scene from './scene';

class Debug {
	constructor(){
		this.canvas = document.querySelector('#scene');
		this.ctx = this.canvas.getContext('2d');
		this.lineLeading = 20;
		this.startPosition = {
			x: 20,
			y: 20
		}
		this.currentPosition = this.startPosition;
		this.ctx.font = "15px Helvetica";
		this.ctx.textBaseline = this.currentPosition.y + this.lineLeading;
	}

	output(){
		this.ctx.fillText('Characters in scene:', this.currentPosition.x, this.currentPosition.y);
		this.charactersInScene.map( character => {
			this.advanceLine();
			this.ctx.fillText(character.type, this.currentPosition.x, this.currentPosition.y);
			this.advanceLine();
			this.ctx.fillText("{x:"+character.position.x+",y:"+character.position.y+"}", this.currentPosition.x, this.currentPosition.y);
		});
	}

	advanceLine(){
		this.currentPosition.y += this.lineLeading;
	}

	reset(){
		this.currentPosition = {
			x: 5,
			y: 5
		}
	}

	update(){
		this.charactersInScene = Scene.getCharactersInScene();
		this.reset();
		this.output();
	}
}

export default new Debug();