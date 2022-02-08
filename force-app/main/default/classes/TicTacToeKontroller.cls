public with sharing class TicTacToeKontroller {
    
	@AuraEnabled(cacheable=true)
	public static List <User> getUserList() {
		 return [
			  SELECT Id, Name
			  FROM User
			  WHERE IsActive = true
			  WITH SECURITY_ENFORCED 
		 ];
	}
	@AuraEnabled
	public static Map<String, String> gameStarted(Id player1,Id player2){
		
		Game_history__c gameHistory = new Game_history__c(); 
		gameHistory.Player_1__c = player1;
		gameHistory.Player_2__c = player2;
		gameHistory.Game_Date__c = System.now();
		gameHistory.Status__c = 'Starting';
		gameHistory.Game_result__c = '0 - 0';
		
		insert gameHistory;

		Round_History__c roundHistory = new Round_History__c();
		roundHistory.Game_history__c = gameHistory.Id;
		roundHistory.Status__c = '	Starting';
		
		insert roundHistory;
		return new Map<String, String>{
			'gHistory' => gameHistory.Id,'rHistory' => roundHistory.Id
		};
	}
	@AuraEnabled
	public static void updateRoundHistory(Id roundId, String step, Integer userN, String winner){
		Round_History__c roundHistoryitem = [
			SELECT Game_history__c,
					Player_1_steps__c,
					Player_2_steps__c,
					Status__c,
					Winner__c, 
					Id 
			FROM Round_History__c 
			WHERE Id = :roundId
			LIMIT 1
		];
		if (userN == 1){
			if(roundHistoryitem.Player_1_steps__c != null){
				roundHistoryitem.Player_1_steps__c += ','+step;
			} else {
				roundHistoryitem.Player_1_steps__c = step;
			}
		} else { 
			if(roundHistoryitem.Player_2_steps__c != null){
				roundHistoryitem.Player_2_steps__c += ','+step;
			} else {
				roundHistoryitem.Player_2_steps__c = step;
			}
		}
		if (!String.isEmpty(winner)){
			roundHistoryitem.Winner__c = winner;
			roundHistoryitem.Status__c = 'Completed';
		}
		update roundHistoryitem;
	}

	@AuraEnabled 											// вызвать метод из lwc компонета 
	public static String newRound(Id gameId){
		Round_History__c roundHistory = new Round_History__c();

		roundHistory.Game_History__c = gameId;
		roundHistory.Status__c = 'Starting';

		insert roundHistory;                       //insert - взял , создал новое и отдал им новое !
		return roundHistory.Id;

	}
	@AuraEnabled 
	public static void gameComplited(Id gameId , String winner ){	

		Game_History__c gameFinished = [
		SELECT Status__c, 
				 Winner__c          // поля
		FROM 	Game_History__c
		WHERE Id = :gameId
		LIMIT 1
		];
		gameFinished.Winner__c = winner;
		gameFinished.Status__c = 'Completed';
		
		update gameFinished;
		
	}

	@AuraEnabled 
	public static void gameStoped(Id gameId ){
		Game_History__c gameStop = [

		SELECT Status__c   
		FROM 	Game_History__c
		WHERE Id = :gameId
		LIMIT 1
		];
		gameStop.Status__c = 'Not complete';

		Round_History__c roundStop= [

		SELECT Status__c   
		FROM 	Round_History__c
		WHERE Game_History__c = :gameId
		LIMIT 1
		];
		roundStop.Status__c = 'Not Completed';
		update roundStop;                                 // update-  взял , поработал и отдал переделанную !
	}

	@AuraEnabled 
	public static void changeGameScore(Id gameId ,String score){
		Game_History__c gameChangeRecord = [

			SELECT Game_result__c
			FROM   Game_History__c
			WHERE Id = :gameId 
			LIMIT 1
		];
		gameChangeRecord.Game_result__c = score;
		update gameChangeRecord;
	}

	@AuraEnabled 
	public static void gameInProgress (Id gameId ){
		Game_History__c inProgressGame = [

		SELECT Status__c
		FROM Game_History__c
		WHERE Id = : gameId 
		LIMIT 1
		];
		inProgressGame.Status__c = 'In progress';

		update inProgressGame;

	}
	@AuraEnabled 
	public static void roundInProgress (Id roundId){
		Round_History__c inProgressRound = [

		SELECT Status__c
		FROM Round_History__c
		WHERE Id = :roundId
		LIMIT 1
		];

		inProgressRound.Status__c = 'In progress';
		update inProgressRound;
	}


	@AuraEnabled(cacheable=true)
	public static List<Game_History__c> returnHistory() {

		return[
			  SELECT 
			  	Id,
			   Name,
				Status__c,
				Game_result__c,
				Winner__r.Name,
				Game_Date__c,
				Player_1__c,
				Player_2__c,
				Player_1__r.Name,
				Player_2__r.Name
			  FROM Game_History__c
			  ORDER BY Name DESC
		 ];

  }

  @AuraEnabled
  public static String getRoundHistory(Id gameId) {
	  System.debug('gameId = '+gameId);
	  Map<String, String> result = new Map<String, String>();
		for(Round_History__c item : [
			SELECT
			 Id, 
			 Winner__r.Name,
			 Status__c,
			 Player_1_steps__c,
			 Player_2_steps__c
			 FROM Round_History__c
			 WHERE Game_History__c = :gameId
			 ]){
				result.put('Status__c', item.Status__c);
				result.put('Winner__c', item.Winner__r.Name);
				result.put('Player_1_steps__c', item.Player_1_steps__c);
				result.put('Player_2_steps__c', item.Player_2_steps__c);
			 }
			 return JSON.serialize(result);
  }

  
 
}
 



	








	
	


