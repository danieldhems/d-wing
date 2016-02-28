import CharacterDefaults from './character-defaults';

export default class Character {
	constructor(options){
		this.element = document.createElement(options.HTMLElement);
	}
}