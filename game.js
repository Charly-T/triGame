const questions = require('./questions');

class Game {
  constructor(io) {
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
    this.handleConnections();
    // this.players.push({
    //   name: 'Jugador 2',
    //   socket: {
    //     emit: () => {
    //       console.log('dummy emit');
    //     }
    //   },
    //   rack: []
    // });
    // this.players.push({
    //   name: 'Jugador 3',
    //   socket: {
    //     emit: () => {
    //       console.log('dummy emit');
    //     }
    //   },
    //   rack: []
    // });
    // this.players.push({
    //   name: 'Jugador 4',
    //   socket: {
    //     emit: () => {
    //       console.log('dummy emit');
    //     }
    //   },
    //   rack: []
    // });
  }
  
  handleConnections() {
    this.io.on('connection', (socket) => {
      socket.on('LOGIN', (e) => {
        console.log(e.name + ' joining room, ' + (this.players.length + 1) + ' players');
        this.addPlayer({
          name: e.name,
          socket: socket
        });
      });
      socket.on('disconnect', () => {
        let deleteIndex;
        for (let i in this.players) {
          if (this.players[i].socket === socket) {
            deleteIndex = i;
            console.log('user ' + this.players[i].name + ' disconnected');
          }
        }
        this.players.splice(deleteIndex, 1);
      });
    });
  }

  addPlayer(player) {
    this.players.push({
      ...player,
      rack: []
    });
    if (this.players.length === 4) {
      this.startGame();
    } else {
      for (let i in this.players) {
        this.players[i].socket.emit('JOINED', {
          player: player.name,
          players: this.players.length
        });
      }
    }
  }

  startGame() {
    this.dealAll();
    this.nextActivePlayer();
    for (let i in this.players) {
      this.players[i].socket.emit('GAME_START',
        this.players.filter(player => player.name !== this.players[i].name).map(player => ({name: player.name, rack: player.rack}))
      );
    }
    this.newTurn();
  }

  dealAll() {
    for (let i in this.players) {
      this.deal(this.players[i]);
    }
  }
  
  deal(player) {
    let random;
    for (let i = 0; i < 3; i++) {
      random = Math.floor(Math.random() * this.undealedTiles.length);
      player.rack.push(this.undealedTiles.splice(random, 1)[0]);
    }
  }
  
  askPlayerResolve() {
    this.players[this.turn.activePlayerIndex].socket.emit('ASK_RESOLVE');
    this.players[this.turn.activePlayerIndex].socket.once('ASK_RESOLVE_RESPONSE', (response) => {
      if (response === 'READ') {
        this.read();
      }
    });
  }
  
  read() {
    let random;
    let question;
    if (this.unreadedQuestions.length === 0) {
      this.unreadedQuestions = this.readedQuestions.slice();
      this.readedQuestions = [];
    }
    random = Math.floor(Math.random() * this.unreadedQuestions.length);
    question = this.unreadedQuestions.splice(random, 1)[0];
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
    for (let i in this.players) {
      this.players[i].socket.emit('READ', {
        question: question.question,
        answer: answer,
        reader: reading.name
      });
      this.players[i].socket.once('READ_DONE', () => {
        this.readComplete(this.players[i].name);
      });
    }
  }
  
  readComplete(playerName) {
    this.turn.ready[playerName] = true;
    let allReady = true;
    for (let i in this.turn.ready) {
      allReady = allReady && this.turn.ready[i];
    }
    if (allReady) {
      for (let i in this.players) {
        this.players[i].socket.emit('FINISH_READ');
      }
      this.nextActivePlayer();
      this.newTurn();
    }
  }
  
  newTurn() {
    this.askPlayerResolve();
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