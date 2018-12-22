import { createElement } from './naive.js';

const loginPlaceholder = document.getElementsByClassName('login-placeholder')[0];
const triLogin = createElement('tri-login');
let user;

triLogin.addEventListener('login', function (e) {
  const socket = io('');
  user = e.detail.name;
  socket.emit('LOGIN', {
    name: e.detail.name
  });
  socket.on('JOINED', (e) => {
    console.log(e);
    
  });
  socket.on('GAME_START', (players) => {
    document.getElementsByTagName('tri-login')[0].remove();
    const racks = document.getElementsByClassName('racks-placeholder')[0];
    for (let i in players) {
      racks.appendChild(createElement('tri-rack', `[name=${players[i].name}][rack=${players[i].rack.map(item => item.number + ',' + item.color).join(';')}]`));
    }
    document.getElementsByClassName('solution-card-placeholder')[0].appendChild(createElement('tri-solution-card'));
  });
  socket.on('ASK_RESOLVE', ()=> {
    socket.emit('ASK_RESOLVE_RESPONSE', 'READ');
  });
  socket.on('READ', (card) => {
    const question = createElement('tri-card-question', `[question=${card.question}][answer=${card.answer}]${card.waitAnswer ? 'waitsAnswer' : ''}`);
    question.addEventListener('READ_DONE', function (e) {
      socket.emit('READ_DONE');
    });
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
  });
  socket.on('FINISH_READ', () => {
    document.getElementsByTagName('tri-card-question')[0].remove();
  });
}, false);
loginPlaceholder.appendChild(triLogin);