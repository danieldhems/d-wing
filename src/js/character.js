import CharacterDefaults from './character-defaults';

export default class Character {
	constructor(options){
		super(options);
	}

	create(options){
		if(CharacterDefaults[options.characterType] === undefined) return false;
		let characterOptions = Object.assign(CharacterDefaults[options.characterType], options)
		this.instance = new Character(characterOptions);
		return this.instance;
	}

	destroy(){
		this.instance = null;
	}
}