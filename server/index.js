let players = [];
let undealedTiles = [
  {number: 1, color: 'GREEN'},
  {number: 2, color: 'YELLOW'},
  {number: 2, color: 'YELLOW'},
  {number: 3, color: 'BLACK'},
  {number: 3, color: 'BLACK'},
  {number: 3, color: 'BLACK'},
  {number: 4, color: 'BROWN'},
  {number: 4, color: 'BROWN'},
  {number: 4, color: 'BROWN'},
  {number: 4, color: 'BROWN'},
  {number: 5, color: 'RED'},
  {number: 5, color: 'RED'},
  {number: 5, color: 'RED'},
  {number: 5, color: 'RED'},
  {number: 5, color: 'BLACK'},
  {number: 6, color: 'PINK'},
  {number: 6, color: 'PINK'},
  {number: 6, color: 'PINK'},
  {number: 6, color: 'GREEN'},
  {number: 6, color: 'GREEN'},
  {number: 6, color: 'GREEN'},
  {number: 7, color: 'YELLOW'},
  {number: 7, color: 'YELLOW'},
  {number: 7, color: 'PINK'},
  {number: 7, color: 'BLUE'},
  {number: 7, color: 'BLUE'},
  {number: 7, color: 'BLUE'},
  {number: 7, color: 'BLUE'},
];
let dealedTiles = [];
let unreadedQuestions = [{
  question: '¿En cuántos soportes la suma de las cifras es 18 o más?',
  answerFunction: () => {}
}, {
  question: '¿En cuántos soportes aparece la misma cifra en colores diferentes? (Por ejemplo, 7 nazul y 7 amarillo en un mismo soporte)',
  answerFunction: () => {}
}, {
  question: '¿Cuantas cifras no ves?',
  answerFunction: () => {}
}, {
  question: '¿En cuántos soportes ves 3 cifras consecutivas?',
  answerFunction: () => {}
}];
let readedQuestions = [];
let turn = {};

players.push({
  name: 'Jugador 1',
  socket: {},
  rack: []
});
players.push({
  name: 'Jugador 2',
  socket: {},
  rack: []
});
players.push({
  name: 'Jugador 3',
  socket: {},
  rack: []
});
players.push({
  name: 'Jugador 4',
  socket: {},
  rack: []
});

function dealAll() {
  deal('Jugador 1');
  deal('Jugador 2');
  deal('Jugador 3');
  deal('Jugador 4');
}

function deal(X) {
  players[X].rack.push(undealedTiles.splice(random, 1));
  players[X].rack.push(undealedTiles.splice(random, 1));
  players[X].rack.push(undealedTiles.splice(random, 1));
}

function askPlayerResolve() {
  
}

function read() {
  var question = unreadedQuestions.splice(random, 1);
  var answer = question.answerFunction(players, turn.activePlayer);
  var reading = players.filter(player => player.name !== turn.activePlayer.name);
  turn.ready = {};
  for (var i in reading) {
    turn.ready[reading[i].name] = false;
  }
  return {
    question: question.text,
    answer: answer
  };
}

dealAll();
nextActivePlayer();
while (!ended) {
  askPlayerResolve();
  read();
  readComplete();
  readComplete();
  readComplete();
  nextActivePlayer();
}

