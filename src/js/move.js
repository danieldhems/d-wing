function Move(character){
	return {
		left(){
			character.position.x = character.position.x - character.velocity;
		},

		right(){
			character.position.x = character.position.x + character.velocity;
		},

		up(){
			character.position.y = character.position.y - character.velocity;
		},

		down(){
			character.position.y = character.position.y + character.velocity;
		}
	}
}

export default Move;