declare module "@salesforce/apex/TicTacToeKontroller.getUserList" {
  export default function getUserList(): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.gameStarted" {
  export default function gameStarted(param: {player1: any, player2: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.updateRoundHistory" {
  export default function updateRoundHistory(param: {roundId: any, step: any, userN: any, winner: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.newRound" {
  export default function newRound(param: {gameId: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.gameComplited" {
  export default function gameComplited(param: {gameId: any, winner: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.gameStoped" {
  export default function gameStoped(param: {gameId: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.changeGameScore" {
  export default function changeGameScore(param: {gameId: any, score: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.gameInProgress" {
  export default function gameInProgress(param: {gameId: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.roundInProgress" {
  export default function roundInProgress(param: {roundId: any}): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.returnHistory" {
  export default function returnHistory(): Promise<any>;
}
declare module "@salesforce/apex/TicTacToeKontroller.getRoundHistory" {
  export default function getRoundHistory(param: {gameId: any}): Promise<any>;
}
