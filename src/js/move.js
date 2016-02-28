function Move(character){
	return {
		left(){
			character.setPosition('x', character.coords.x - character.velocity);
		},

		right(){
			let newPosition = character.coords.x + character.velocity
			character.setPosition('x', newPosition);
		},

		up(){
			character.setPosition('y', character.coords.y - character.velocity);
		},

		down(){
			character.setPosition('y', character.coords.y + character.velocity);
		}
	}
}

export default Move;