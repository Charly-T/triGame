import { createElement } from './naive.js';

const loginPlaceholder = document.getElementsByClassName('login-placeholder')[0];
const triLogin = createElement('tri-login');
let user;
let socket;

triLogin.addEventListener('login', function (e) {
  socket = io('');
  user = e.detail.name;
  socket.emit('LOGIN', {
    name: e.detail.name
  });
  socket.on('JOINED', userJoined);
  socket.on('GAME_START', gameStart);
  socket.on('ASK_RESOLVE', resolveAsk);
  socket.on('READ', readQuestion);
  socket.on('FINISH_READ', readFinish);
}, false);


const userJoined = (e) => {
  let event = new CustomEvent('JOINED', {
    detail: {
      players: e.players,
      myself: user
    }
  });
  triLogin.dispatchEvent(event);
  if (e.player === user) {
    const chat = createElement('tri-chat');
    chat.addEventListener('CHAT:SEND', chatSend);
    socket.on('CHAT:BROADCAST', chatRecieve);
    // document.getElementsByClassName('chat-placeholder')[0].appendChild(chat);
  }
};

const gameStart = (players) => {
  document.getElementsByTagName('tri-login')[0].remove();
  const racks = document.getElementsByClassName('racks-placeholder')[0];
  for (let i in players) {
    racks.appendChild(createElement('tri-rack', `[name=${players[i].name}][rack=${players[i].rack.map(item => item.number + ',' + item.color).join(';')}]`));
  }
  document.getElementsByClassName('solution-card-placeholder')[0].appendChild(createElement('tri-solution-card'));
  recalcSolutionCard();
};

const resolveAsk = () => {
  socket.emit('ASK_RESOLVE_RESPONSE', 'READ');
};

const readQuestion = (card) => {
  const question = createElement('tri-card-question', `[question=${card.question}][answer=${card.answer}][${user === card.reader ? 'reading' : ''}]`);
  const readDone = (e) => {
    socket.emit('READ_DONE');
  };
  question.addEventListener('READ_DONE', readDone);
  document.getElementsByClassName('card-question-placeholder')[0].appendChild(question);
  let event = new CustomEvent('HIGHLIGHT', {
    detail: false
  });
  const racks = document.querySelectorAll(`tri-rack`);
  racks.forEach((item) => {
    item.dispatchEvent(event);
  });
  if (user !== card.reader) {
    event = new CustomEvent('HIGHLIGHT', {
      detail: true
    });
    document.querySelector(`tri-rack[name=${card.reader}]`).dispatchEvent(event);
  }
  recalcSolutionCard();
};

const readFinish = () => {
  document.getElementsByTagName('tri-card-question')[0].remove();
};

const chatSend = (e) => {
  socket.emit('CHAT:SEND', {
    text: e.detail.text
  });
};

const chatRecieve = (e, chat) => {
  const event = new CustomEvent('CHAT:BROADCAST', {
    detail: {
      player: e.player,
      text: e.text
    }
  });
  chat.dispatchEvent(event);
};

const recalcSolutionCard = () => {
  const totalHeight = window.innerHeight;
  const racksHeight = document.getElementsByClassName('racks-placeholder')[0].clientHeight;
  const questionHeight = document.getElementsByClassName('card-question-placeholder')[0].clientHeight;
  const heightLeft = totalHeight - racksHeight - questionHeight - 16;
  document.getElementsByClassName('solution-card-placeholder')[0].style.fontSize = Math.floor(0.0390625 * heightLeft) + 'px';
}

loginPlaceholder.appendChild(triLogin);
