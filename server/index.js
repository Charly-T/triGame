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
let turn = {
  activePlayerIndex: -1
};

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

function deal(playerName) {
  let random;
  let player = players.find(player => player.name === playerName);
  random = Math.floor(Math.random() * undealedTiles.length) + 1;
  player.rack.push(undealedTiles.splice(random, 1));
  random = Math.floor(Math.random() * undealedTiles.length) + 1;
  player.rack.push(undealedTiles.splice(random, 1));
  random = Math.floor(Math.random() * undealedTiles.length) + 1;
  player.rack.push(undealedTiles.splice(random, 1));
  console.log(player);
}

function askPlayerResolve() {
  
}

function read() {
  const random = Math.floor(Math.random() * unreadedQuestions.length);
  var question = unreadedQuestions.splice(random, 1)[0];
  console.log(question, random);
  var answer = question.answerFunction(players, turn.activePlayer);
  var reading = players[turn.activePlayerIndex];
  turn.ready = {};
  for (var i in reading) {
    turn.ready[reading[i].name] = false;
  }
  return {
    question: question.text,
    answer: answer
  };
}

function readComplete(playerName) {
  turn.ready[playerName] = true;
}

function nextActivePlayer() {
  turn.activePlayerIndex = ++turn.activePlayerIndex%players.length;
}

let ended = false;
dealAll();
nextActivePlayer();
while (!ended) {
  askPlayerResolve();
  read();
  readComplete('Jugador 2');
  readComplete('Jugador 3');
  readComplete('Jugador 4');
  nextActivePlayer();
  ended = true;
}
