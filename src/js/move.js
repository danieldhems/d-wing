function Move(character){
	return {
		left(){
			character.element.style.left = parseInt(character.element.style.left) - character.velocity + 'px';
		},

		right(){
			character.element.style.left = parseInt(character.element.style.left) + character.velocity + 'px';
		},

		up(){
			character.element.style.top = parseInt(character.element.style.top) - character.velocity + 'px';
		},

		down(){
			character.element.style.top = parseInt(character.element.style.top) + character.velocity + 'px';
		}
	}
}

export default Move;