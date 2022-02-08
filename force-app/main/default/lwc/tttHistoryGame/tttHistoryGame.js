import { LightningElement, wire,track} from 'lwc';
import returnHistory from '@salesforce/apex/TicTacToeKontroller.returnHistory';
import getRoundHistory from '@salesforce/apex/TicTacToeKontroller.getRoundHistory';
import ExternalDataSourceId from '@salesforce/schema/Product2.ExternalDataSourceId';


export default class TttHistoryGame extends LightningElement {


	showModalBox = false;
	roundHistories = [];
	@track gameHistory;
	@wire (returnHistory) records({ error, data }) 
	{ 
		if ( data ) { 
			 this.gameHistory = data; 
		} else if ( error )
			 console.log( 'Error is ' + JSON.stringify( error ) );
			 
	}
	openModal(event){
	  this.showModalBox = true; 
	  let gameId = event.target.dataset.id;
	  console.log('gameId = ',gameId);
	  getRoundHistory({'gameId': gameId}).then(result => {
		  this.roundHistories = JSON.parse(result);
		  console.log(this.roundHistories);
	  }).catch(error => {
		  console.log(error);
	  });
	  
	  
	 


  }
   closeModal() {
	this.showModalBox = false;
}
	columns = [
		{ label: 'Status', fieldName: 'Status__c' },
		{ label: 'Player 1 steps', fieldName: 'Player_1_steps__c'},
		{ label: 'Player 2 steps', fieldName: 'Player_2_steps__c'},
		{ label: 'Winner', fieldName: 'Winner__c' },
	];

	
    
	 


	 



  
  
 
  

   

  






	
	
	


	








	
}