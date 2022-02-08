import { LightningElement, wire } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONFETTI from "@salesforce/resourceUrl/confetti";




export default class TttMain extends LightningElement {
	myconfetti;
	loaded = true;
	
	

	hideSpinner(event){
		this.loaded = false;
	}
	winNextGame(){
		this.confettiRun();
		this.showSuccessNotification();
	}
	confettiRun(){
		this.setUpCanvas();
		this.basicCannon();
		this.fireworks();
	}
	connectedCallback() {
		loadScript(this, CONFETTI )
		  .then(() => { console.log('SUCCESS'); })
		  .catch(error => {console.log('ERROR =>', error);});
	 }
	 setUpCanvas() {
		var confettiCanvas = this.template.querySelector("canvas.confettiCanvas");
		this.myconfetti = confetti.create(confettiCanvas, { resize: true });
		this.myconfetti({
		  zIndex: 10000
		});
	 }
	 basicCannon() {
		confetti({
		  particleCount: 300,
		  spread: 500,
		  origin: {
			 y: 0.6
		  }
		});
	}
	fireworks() {
		let end = Date.now() + 5 * 1000;
		let interval = setInterval(function() {
		  if (Date.now() > end) {
				eval("$A.get('e.force:refreshView').fire();");
				return clearInterval(interval);
		  }
		  confetti({
			 startVelocity: 30,
			 spread: 360,
			 ticks: 60,
			 origin: {
				x: Math.random(),
				y: Math.random() - 0.2
			 }
		  });
		}, 200);
	}
	showSuccessNotification() {
		const evt = new ShowToastEvent({
			 title: "Tic • Tac • Toe",
			 message: "               --- WINNER ---",
			 variant: "success",
		});
		this.dispatchEvent(evt);
		
  }
 

  


  
	
	

   
	
	
  
 
 
  
	

	

  

	 
	 
	









}