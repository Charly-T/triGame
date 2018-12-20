import { div, createElement } from './naive.js';

const loginPlaceholder = document.getElementsByClassName('login-placeholder')[0];
const triLogin = createElement('tri-login');

triLogin.addEventListener('login', function (e) {
  const socket = io('');
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
    document.getElementsByClassName('card-question-placeholder')[0].appendChild(createElement('tri-card-question', `[question=${card.question}][answer=${card.answer}]${card.waitAnswer ? 'waitsAnswer' : ''}`));
  });
}, false);
loginPlaceholder.appendChild(triLogin);