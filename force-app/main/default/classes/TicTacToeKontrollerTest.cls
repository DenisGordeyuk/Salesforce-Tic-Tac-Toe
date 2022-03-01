@isTest 
public with sharing class TicTacToeKontrollerTest {
    
	@isTest public static void testTicTacToeKonroller(){
		List<User> users = TicTacToeKontroller.getUserList();
		System.assertEquals(users.size() > 0, true);
		Map<String, String> result = TicTacToeKontroller.gameStarted(users[0].Id, users[1].Id);
		System.assertEquals(result != null, true);

		TicTacToeKontroller.updateRoundHistory(result.get('rHistory'),'1',1,'');
		TicTacToeKontroller.updateRoundHistory(result.get('rHistory'),'2',0,'');
		TicTacToeKontroller.updateRoundHistory(result.get('rHistory'),'3',1,'');
		TicTacToeKontroller.updateRoundHistory(result.get('rHistory'),'4',0,users[0].Id);
		System.assertEquals(
			[SELECT Status__c FROM Round_History__c WHERE Id = :result.get('rHistory')].Status__c,
			'Completed');

		String newRound = TicTacToeKontroller.newRound(result.get('gHistory'));
		System.assertEquals(newRound != null, true );

		TicTacToeKontroller.gameComplited(result.get('gHistory'),users[0].Id);
		System.assertEquals(
			[SELECT Status__c FROM Game_History__c WHERE Id = :result.get('gHistory')].Status__c,
			'Completed');

			
		TicTacToeKontroller.gameStoped(result.get('gHistory'));
		System.assertEquals(
			[SELECT Status__c FROM Game_History__c WHERE Id = :result.get('gHistory')].Status__c,
			'Not complete');

		TicTacToeKontroller.changeGameScore(result.get('gHistory'),'0-0');
		System.assertEquals(
			[SELECT Game_result__c FROM Game_History__c WHERE Id = :result.get('gHistory')].Game_result__c,'0-0');
		
		TicTacToeKontroller.gameInProgress(result.get('gHistory'));
		System.assertEquals(
			[SELECT Status__c FROM Game_History__c WHERE Id = :result.get('gHistory')].Status__c,
			'In progress');

		TicTacToeKontroller.roundInProgress(result.get('rHistory'));
		System.assertEquals(
			[SELECT Status__c FROM Round_History__c WHERE Id = :result.get('rHistory')].Status__c,
			'In progress');

		List<Game_History__c> returnHistory = TicTacToeKontroller.returnHistory();
		System.assertEquals(returnHistory.size() > 0, true);

		List<Round_History__c> getRoundHistory = TicTacToeKontroller.getRoundHistory(result.get('gHistory'));
		System.assertEquals(getRoundHistory.size() > 0, true);
			


		



		


		


		



	}











	
	
		
		





}
