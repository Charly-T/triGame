const questions = require('./questions');

class Game {
  constructor(io) {
    this.players = [];
    this.undealedTiles = this.buildTiles();
    this.unreadedQuestions = questions;
    this.readedQuestions = [];
    this.turn = {
      activePlayerIndex: -1
    };
    this.io = io;
    this.handleConnections();
  }

  buildTiles() {
    return [
      {number: 1, color: 'GREEN'}, {number: 2, color: 'YELLOW'}, {number: 2, color: 'YELLOW'}, {number: 3, color: 'BLACK'}, {number: 3, color: 'BLACK'},
      {number: 3, color: 'BLACK'}, {number: 4, color: 'BROWN'},  {number: 4, color: 'BROWN'},  {number: 4, color: 'BROWN'}, {number: 4, color: 'BROWN'},
      {number: 5, color: 'RED'},   {number: 5, color: 'RED'},    {number: 5, color: 'RED'},    {number: 5, color: 'RED'},   {number: 5, color: 'BLACK'},
      {number: 6, color: 'PINK'},  {number: 6, color: 'PINK'},   {number: 6, color: 'PINK'},   {number: 6, color: 'GREEN'}, {number: 6, color: 'GREEN'},
      {number: 6, color: 'GREEN'}, {number: 7, color: 'YELLOW'}, {number: 7, color: 'YELLOW'}, {number: 7, color: 'PINK'},  {number: 7, color: 'BLUE'},
      {number: 7, color: 'BLUE'},  {number: 7, color: 'BLUE'},   {number: 7, color: 'BLUE'},
    ];
  }
  
  handleConnections() {
    this.io.on('connection', (socket) => {
      socket.on('LOGIN', (e) => {
        const room = 'A';
        socket.join('ROOM:' + room);
        console.log(`${e.name} joining room ${room}, ${this.players.length + 1} players`);
        this.addPlayer({
          name: e.name,
          socket: socket
        }, room);
      });
      socket.on('disconnect', () => {
        let deleteIndex;
        for (let i in this.players) {
          if (this.players[i].socket === socket) {
            deleteIndex = i;
            console.log('user ' + this.players[i].name + ' disconnected');
          }
        }
        // this.io.to('ROOM:' + room).emit('USER_DISCONNECTED', {
        //   name: this.players[deleteIndex].name
        // });
        this.players.splice(deleteIndex, 1);
      });
    });
  }

  addPlayer(player, room) {
    this.players.push({
      ...player,
      rack: []
    });
    if (this.players.length === 4) {
      this.startGame(room);
    }
    this.io.to('ROOM:' + room).emit('JOINED', {
      player: player.name,
      players: this.players.map(item => item.name)
    });
    player.socket.on('CHAT:SEND', (text) => {
      this.io.to('ROOM:' + room).emit('CHAT:BROADCAST', {
        player: player.name,
        text: text.text
      });
    });
  }

  startGame(room) {
    this.dealAll(room);
    this.nextActivePlayer(room);
    
    for (let i in this.players) {
      this.players[i].socket.emit('GAME_START',
        this.players.filter(player => player.name !== this.players[i].name).map(player => ({name: player.name, rack: player.rack}))
      );
    }
    this.newTurn(room);
  }

  dealAll(room) {
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
  
  askPlayerResolve(room) {
    this.players[this.turn.activePlayerIndex].socket.emit('ASK_RESOLVE');
    this.players[this.turn.activePlayerIndex].socket.once('ASK_RESOLVE_RESPONSE', (response) => {
      if (response === 'READ') {
        this.read(room);
      }
    });
  }
  
  read(room) {
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
    
    this.io.to('ROOM:' + room).emit('READ', {
      question: question.question,
      answer: answer,
      reader: reading.name
    });
    for (let i in this.players) {
      if (i != this.turn.activePlayerIndex) {
        this.players[i].socket.once('READ_DONE', () => {
          this.readComplete(this.players[i].name, room);
        });
      } else {
        this.turn.ready[this.turn.activePlayerIndex] = true;
      }
    }
  }
  
  readComplete(playerName, room) {
    this.turn.ready[playerName] = true;
    let allReady = true;
    for (let i in this.turn.ready) {
      allReady = allReady && this.turn.ready[i];
    }
    if (allReady) {
      this.io.to('ROOM:' + room).emit('FINISH_READ');
      this.nextActivePlayer(room);
      this.newTurn(room);
    }
  }
  
  newTurn(room) {
    this.askPlayerResolve(room);
  }
  
  nextActivePlayer(room) {
    this.turn.activePlayerIndex = ++this.turn.activePlayerIndex%this.players.length;
  }
}

module.exports = Game;