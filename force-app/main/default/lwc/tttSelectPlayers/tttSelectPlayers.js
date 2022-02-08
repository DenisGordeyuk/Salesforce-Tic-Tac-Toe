import {
	api,
	LightningElement,
	wire
} from 'lwc';
import getUserList from '@salesforce/apex/TicTacToeKontroller.getUserList';
import gameStarted from '@salesforce/apex/TicTacToeKontroller.gameStarted';



export default class TttSelectPlayers extends LightningElement {

	@api userList1 = [];
	@api userList2 = [];
	users = [];
	user1 = {};
	user2 = {};
	


	isGameFieldVisible = false;
	isNotChoosenUsers = true;




	connectedCallback() { // инициализируем листы 
		getUserList()
			.then(result => {
				let usList = [{
					Id: '',
					Name: '-- Choose user --'
				}];
				this.userList1 = this.sortUserList(usList.concat(result));
				this.userList2 = this.sortUserList(usList.concat(result));
				this.users = this.sortUserList(usList.concat(result));
				this.dispatchEvent(new CustomEvent('loaded'));
			})
			.catch(error => {
				console.log('ERROR => ', error);
			})
	}
	selectFirstUser(event) {
		console.log('event.target.value => ',event.target.value);
		
		if (this.user1.Id != undefined && this.user1.Id != '') {
			this.userList2 = [...this.userList2, this.user1]; // <--- Конкатинация массивов , возвращает новый массив !		
		}
		this.userList1.forEach(el => { // forEach - бежит по всем элементом !
			console.log('el.Id => ',el.Id);
			console.log('el.Id === event.target.value => ',el.Id === event.target.value);
			if (el.Id === event.target.value) { // === - равенство по значению //тут мы выбрали объект 
				this.user1 = el;
			}
		});
		console.log('this.user1 = ',this.user1);
		if (this.user1.Id != undefined && this.user1.Id != '') {
			this.userList2 = this.userList2.filter(el => {
				return el.Id != this.user1.Id
			});
		}
		this.userList2 = this.sortUserList(this.userList2); // = присваение 
		this.dispatchEvent(new CustomEvent('firstuserchoosen',{detail:this.user1}))
		if (this.user1.Id != undefined && 
			 this.user1.Id != '' && 
			 this.user2.Id != undefined && 
			 this.user2.Id)
		{
			this.isNotChoosenUsers = false;
		}else{
			this.isNotChoosenUsers = true;
		}
	}
	selectSecondUser(event) {
		console.log('user1.Id => ',this.user1.Id);
		console.log('user2.Id => ',this.user2.Id);
		if (this.user2.Id != undefined && this.user2.Id != '') {
			this.userList1 = [...this.userList1, this.user2]; // <--- Конкатинация массивов , возвращает новый массив !		
		}
		this.userList2.forEach(el => {
			if (el.Id === event.target.value) {
				this.user2 = el;
				return;
			}
		});
		if (this.user2.Id != undefined && this.user2.Id != '') {
			this.userList1 = this.userList1.filter(el => {
				return el.Id != this.user2.Id
			});
		}
		this.userList1 = this.sortUserList(this.userList1);
		this.dispatchEvent(new CustomEvent('seconduserchoosen',{detail:this.user2}))
		if (this.user1.Id != undefined && 
			 this.user1.Id != '' && 
			 this.user2.Id != undefined && 
			 this.user2.Id)
	  {
		  this.isNotChoosenUsers = false;
	  }else{
		this.isNotChoosenUsers = true;
	}
	}
	startGame(event) {
		
		gameStarted({ player1: this.user1.Id, player2: this.user2.Id})
            .then(result => {
					this.dispatchEvent(new CustomEvent('showgamefield',{detail:result}));
					this.isGameFieldVisible = true;
			

            })
            .catch(error => {
					console.log(error);
            });

		console.log("after game started");
	}
	stopGame(event) {
		this.dispatchEvent(new CustomEvent('hidegamefield'));
		this.isGameFieldVisible = false;
		this.isNotChoosenUsers = true;
		this.userList1 = this.users;
		this.userList2 = this.users;
		this.user1 = this.users[0];
		this.user2 = this.users[0];
		console.log('STOP GAME');

		

		
	}

	sortUserList(userList) {
		userList.sort((a, b) => (a.Name > b.Name) ? 1 : -1)
		return userList;
	}


}