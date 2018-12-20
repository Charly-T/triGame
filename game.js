const questions = require('./questions');

class Game {
  constructor(io) {
    console.log(questions);
    
    this.players = [];
    this.undealedTiles = [
      {number: 1, color: 'GREEN'}, {number: 2, color: 'YELLOW'}, {number: 2, color: 'YELLOW'}, {number: 3, color: 'BLACK'}, {number: 3, color: 'BLACK'},
      {number: 3, color: 'BLACK'}, {number: 4, color: 'BROWN'},  {number: 4, color: 'BROWN'},  {number: 4, color: 'BROWN'}, {number: 4, color: 'BROWN'},
      {number: 5, color: 'RED'},   {number: 5, color: 'RED'},    {number: 5, color: 'RED'},    {number: 5, color: 'RED'},   {number: 5, color: 'BLACK'},
      {number: 6, color: 'PINK'},  {number: 6, color: 'PINK'},   {number: 6, color: 'PINK'},   {number: 6, color: 'GREEN'}, {number: 6, color: 'GREEN'},
      {number: 6, color: 'GREEN'}, {number: 7, color: 'YELLOW'}, {number: 7, color: 'YELLOW'}, {number: 7, color: 'PINK'},  {number: 7, color: 'BLUE'},
      {number: 7, color: 'BLUE'},  {number: 7, color: 'BLUE'},   {number: 7, color: 'BLUE'},
    ];
    this.unreadedQuestions = questions;
    this.readedQuestions = [];
    this.turn = {
      activePlayerIndex: -1
    };
    this.io = io;
    this.players.push({
      name: 'Jugador 1',
      socket: {},
      rack: []
    });
    this.players.push({
      name: 'Jugador 2',
      socket: {},
      rack: []
    });
    this.players.push({
      name: 'Jugador 3',
      socket: {},
      rack: []
    });
    this.players.push({
      name: 'Jugador 4',
      socket: {},
      rack: []
    });
  }
  
  
  dealAll() {
    deal('Jugador 1');
    deal('Jugador 2');
    deal('Jugador 3');
    deal('Jugador 4');
    newTurn();
  }
  
  deal(playerName) {
    let random;
    let player = this.players.find(player => player.name === playerName);
    for (let i = 0; i < 3; i++) {
      random = Math.floor(Math.random() * this.undealedTiles.length);
      player.rack.push(this.undealedTiles.splice(random, 1)[0]);
    }
  }
  
  askPlayerResolve() {
    
  }
  
  read() {
    const random = Math.floor(Math.random() * this.unreadedQuestions.length);
    const question = this.unreadedQuestions.splice(random, 1)[0];
    this.readedQuestions.push(question);
    const racks = this.players
      .filter((player, index) => index !== this.turn.activePlayerIndex)
      .map(player => player.rack);
    const answer = question.answerFunction(racks);
    const reading = this.players[this.turn.activePlayerIndex];
    this.turn.ready = {};
    for (let i in this.players) {
      this.turn.ready[this.players[i].name] = false;
    }
    this.turn.ready[reading.name] = true;
    console.log('question', question.question);
    console.log('answer', answer);
    
    return {
      question: question.question,
      answer: answer
    };
  }
  
  readComplete(playerName) {
    this.turn.ready[playerName] = true;
    let allReady = true;
    for (let i in this.turn.ready) {
      allReady = allReady && this.turn.ready[i];
    }
    if (allReady) {
      nextActivePlayer();
      newTurn();
    }
  }
  
  newTurn() {
    askPlayerResolve();
  }
  
  nextActivePlayer() {
    this.turn.activePlayerIndex = ++this.turn.activePlayerIndex%this.players.length;
  }

  mockExecution() {
    dealAll();
    nextActivePlayer();
    read();
    readComplete('Jugador 2');
    readComplete('Jugador 3');
    readComplete('Jugador 4');
    read();
    readComplete('Jugador 3');
    readComplete('Jugador 4');
    readComplete('Jugador 1');
    read();
    readComplete('Jugador 4');
    readComplete('Jugador 1');
    readComplete('Jugador 2');
    read();
    readComplete('Jugador 1');
    readComplete('Jugador 2');
    readComplete('Jugador 3');
  }
  
}

module.exports = Game;