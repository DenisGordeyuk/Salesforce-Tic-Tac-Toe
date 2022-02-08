import {
	api,
	LightningElement
} from 'lwc';
import updateRoundHistory from '@salesforce/apex/TicTacToeKontroller.updateRoundHistory';
import gameComplited from '@salesforce/apex/TicTacToeKontroller.gameComplited';
import gameStoped from '@salesforce/apex/TicTacToeKontroller.gameStoped';
import newRound from '@salesforce/apex/TicTacToeKontroller.newRound';
import changeGameScore from '@salesforce/apex/TicTacToeKontroller.changeGameScore';
import gameInProgress from '@salesforce/apex/TicTacToeKontroller.gameInProgress';
import roundInProgress from '@salesforce/apex/TicTacToeKontroller.roundInProgress';

export default class TttGameField extends LightningElement {

	@api user1;
	@api user2;
	@api history ;

	iconName = "";
	checker = 1;
	xPoints = [];
	oPoints = [];
	winList = [];
	isNextRoundVisible = false;
	progressGame = false;
	progressRound = false;
	user1Score = 0;
	user2Score = 0;
	countStep = 0;


	


	winCombinations = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7]
	];
	
	checkForWinner(points) {
		let winner = false;
		this.winCombinations.forEach(winEl => {
			let winCheck = true;
				winEl.forEach(item => {
					if (points.indexOf(item) === -1) {
						winCheck = false;
					}
			});
			if (winCheck) {
				winner = true;
				this.winList = winEl;
			}
		});
		return winner;
	}
	stepClick(event) {
		let userN = this.checker === 1 ? '1' : '2';
		let winner;
		let isScoreChanged = false;
		this.countStep ++;
		let clickId = event.target.dataset.id; 
		let pointId = clickId.replace("icon", "").replace("div", ""); 
		let divElement = this.template.querySelector('div[data-id = "div' + pointId + '"]');
		let iconElement = this.template.querySelector('lightning-icon[data-id = "icon' + pointId + '"]');
		divElement.classList.add('not-active');
		let points = [];


		if (this.checker === 1) {
			iconElement.iconName = 'utility:close';
			this.xPoints.push(parseInt(pointId));
			points = this.xPoints;
			this.checker = 0;
		}else{
			iconElement.iconName = 'utility:routing_offline';
				this.oPoints.push(parseInt(pointId));
				points = this.oPoints;
				this.checker = 1;		
		} 
		if(!this.progressRound){
			roundInProgress({'roundId' : this.history.rHistory})
				.then(result => {this.progressRound = true;})
				.catch(error => {console.log(error)})
		}
		
		
		if (this.checkForWinner(points)) {
			isScoreChanged = true;

			let boardDiv = this.template.querySelector('div[data-id = "boardId"]');
			boardDiv.classList.add('not-active');
			this.winList.forEach(divId => {
				let divColor = this.template.querySelector('div[data-id = "div' + divId + '"]');
				divColor.classList.add('win-color');
			})
			if(this.checker === 1){
				winner = this.user2.Id;
				this.user2Score = this.user2Score + 1;
			}else{
				winner = this.user1.Id;
				this.user1Score = this.user1Score + 1;
			}
			if(this.user1Score != 3 && this.user2Score != 3){
				this.isNextRoundVisible = true;
			}else{
				this.dispatchEvent(new CustomEvent('winconfettirun',{ composed:true,bubbles: true }));

			gameComplited({'gameId' : this.history.gHistory , 'winner' : winner})
				.then(result => {console.log(result)})
				.catch(error => {console.log(error)})
			}
		}
		if (this.countStep === 9){
			this.isNextRoundVisible = true;
		} 
		if(this.isNextRoundVisible && !this.progressGame){     // true and !false
			gameInProgress({'gameId' : this.history.gHistory})
				.then(result => {this.progressGame = true;})
				.catch(error => {console.log(error)})
		}
			updateRoundHistory({'roundId' : this.history.rHistory,'step' : pointId, 'userN' : userN , 'winner' : winner})
				.then(result => {console.log(result);})
				.catch(error => {console.log(error);})

		if (isScoreChanged){	
			changeGameScore({'gameId' : this.history.gHistory , 'score' : this.user1Score + ':' + this.user2Score })
				.then(result => {console.log(result)})
				.catch(error => {console.log(error)})
		}
	}

	nextRound(){
		let divRoot = this.template.querySelector('div[data-id = "boardId"]'); 
		let divBoard = divRoot.querySelectorAll('.not-active');
		divBoard.forEach( item => {
			item.classList.remove('not-active');
			item.classList.remove('win-color');
		})
		divRoot.classList.remove('not-active');
		let divlightningIcon = divRoot.querySelectorAll('lightning-icon');
		divlightningIcon.forEach(iconItem => {
			iconItem.iconName = '';
			this.isNextRoundVisible = false;
		})
		this.countStep = 0;
		this.checker = 1;
		this.xPoints = [];
		this.oPoints = [];
		this.winList = [];

		newRound({'gameId' : this.history.gHistory}) 
			.then(result => {
			let history = {
				gHistory : this.history.gHistory,
				rHistory : result
			};
			this.history = history;
		}) 
		.catch(error => {console.log(error)})
	}
	
	@api inCompliteGame(){
		gameStoped({'gameId' : this.history.gHistory}) 
			.then(result => {console.log(result)})
			.catch(error => {console.log(error)})
	}
	



}