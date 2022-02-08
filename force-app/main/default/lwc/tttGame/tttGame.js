import {
	LightningElement
} from 'lwc';

export default class TttGame extends LightningElement {

	isGameFieldVisible = false;
	user1;
	user2;

	history = {};	

	firstUserChoosen(event){
		this.user1 = event.detail;
	}
	secondUserChoosen(event){
		console.log(event.detail);
		this.user2 = event.detail;
	}
	handleChange(event) {
		if (this.isGameFieldVisible){
			let gameField = this.template.querySelector('c-ttt-game-field');
			gameField.inCompliteGame();
		} else {
			this.history = event.detail;
		}
		this.isGameFieldVisible = !this.isGameFieldVisible;
	}
	hideSpinnerEvent() {
		this.dispatchEvent(new CustomEvent('hidespinner'));
	}
	
}