let players = [];
let undealedTiles = [
  {number: 1, color: 'GREEN'}, {number: 2, color: 'YELLOW'}, {number: 2, color: 'YELLOW'}, {number: 3, color: 'BLACK'}, {number: 3, color: 'BLACK'},
  {number: 3, color: 'BLACK'}, {number: 4, color: 'BROWN'},  {number: 4, color: 'BROWN'},  {number: 4, color: 'BROWN'}, {number: 4, color: 'BROWN'},
  {number: 5, color: 'RED'},   {number: 5, color: 'RED'},    {number: 5, color: 'RED'},    {number: 5, color: 'RED'},   {number: 5, color: 'BLACK'},
  {number: 6, color: 'PINK'},  {number: 6, color: 'PINK'},   {number: 6, color: 'PINK'},   {number: 6, color: 'GREEN'}, {number: 6, color: 'GREEN'},
  {number: 6, color: 'GREEN'}, {number: 7, color: 'YELLOW'}, {number: 7, color: 'YELLOW'}, {number: 7, color: 'PINK'},  {number: 7, color: 'BLUE'},
  {number: 7, color: 'BLUE'},  {number: 7, color: 'BLUE'},   {number: 7, color: 'BLUE'},
];
let dealedTiles = [];
let unreadedQuestions = [{
  _id: 1,
  question: '¿En cuántos soportes la suma de las cifras es 18 o más?',
  answerFunction: (racks) => {
    const solution = racks.reduce((prev, rack) => {
      return prev + (rack.reduce((prev, tile) => prev + tile.number, 0) >= 18 ? 1 : 0);
    }, 0);
    return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
  }
}, {
  _id: 3,
  question: '¿En cuántos soportes aparece la misma cifra en colores diferentes? (Por ejemplo, 7 azul y 7 amarillo en un mismo soporte)',
  answerFunction: (racks) => {
    const solution = racks.reduce((prev, rack) => {
      return prev + (rack[0].number === rack[1].number && rack[0].color !== rack[1].color ||
              rack[0].number === rack[2].number && rack[0].color !== rack[2].color ||
              rack[1].number === rack[2].number && rack[1].color !== rack[2].color) ? 1 : 0;
    }, 0);
    return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
  }
}, {
  _id: 7,
  question: '¿En cuántos soportes ves 3 cifras consecutivas?',
  answerFunction: (racks) => {
    const solution = racks.reduce((prev, rack) => {
      const sorted = rack.slice().sort((tileA, tileB) => {
        return tileA.number > tileB.number;
      });
      let consecutives = true;
      for (let i = 1; i < sorted.length && consecutives; i++) {
        if (sorted[i].number - sorted[i - 1].number !== 1) {
          consecutives = false;
        }
      }
      return prev + consecutives ? 1 : 0;
    }, 0);
    return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
  }
}, {
  _id: 10,
  question: '¿Cuantas cifras no ves?',
  answerFunction: (racks) => {
    const numbers = [false, false, false, false, false, false, false];
    for (let i in racks) {
      for (let j in racks[i]) {
        numbers[racks[i][j].number - 1] = true;
      }
    }
    const solution = numbers.reduce((prev, number) => {
      return prev + (!number ? 1 : 0);
    }, 0);
    return `No veo ${solution} cifra${solution === 1 ? '' : 's'}`;
  }
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
  newTurn();
}

function deal(playerName) {
  let random;
  let player = players.find(player => player.name === playerName);
  random = Math.floor(Math.random() * undealedTiles.length);
  player.rack.push(undealedTiles.splice(random, 1)[0]);
  random = Math.floor(Math.random() * undealedTiles.length);
  player.rack.push(undealedTiles.splice(random, 1)[0]);
  random = Math.floor(Math.random() * undealedTiles.length);
  player.rack.push(undealedTiles.splice(random, 1)[0]);
}

function askPlayerResolve() {
  
}

function read() {
  const random = Math.floor(Math.random() * unreadedQuestions.length);
  var question = unreadedQuestions.splice(random, 1)[0];
  const racks = players
    .filter((player, index) => index !== turn.activePlayerIndex)
    .map(player => player.rack);
  var answer = question.answerFunction(racks);
  var reading = players[turn.activePlayerIndex];
  turn.ready = {};
  for (var i in players) {
    turn.ready[players[i].name] = false;
  }
  turn.ready[reading.name] = true;
  console.log('question', question.question);
  console.log('answer', answer);
  
  return {
    question: question.question,
    answer: answer
  };
}

function readComplete(playerName) {
  turn.ready[playerName] = true;
  let allReady = true;
  for (var i in turn.ready) {
    allReady = allReady && turn.ready[i];
  }
  if (allReady) {
    nextActivePlayer();
    newTurn();
  }
}

function newTurn() {
  askPlayerResolve();
}

function nextActivePlayer() {
  turn.activePlayerIndex = ++turn.activePlayerIndex%players.length;
}

let ended = false;
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
