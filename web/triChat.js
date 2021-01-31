import { div, createElement, style } from './naive.js';

class TriChat extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.handleEvents();
  }

  addChat() {
    const messages = div('.messages');
    this.root.appendChild(messages);
    const form = createElement('form', '', [
      createElement('input', '[type=text]'),
      createElement('input', '[type=submit][value=↵]'),
    ]);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = e.target.elements[0].value;
      e.target.elements[0].value = '';
      this.sendMessage(text);
    });
    const chatBox = div('.chat-box', [
      form
    ]);
    this.root.appendChild(chatBox);
  }

  addStyle() {
    this.shadow.appendChild(this.getStyle());
  }

  sendMessage(text) {
    const event = new CustomEvent('CHAT:SEND', {
      detail: {
        text: text
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    this.root = div('.chat');
    this.shadow.appendChild(this.root);
    this.addChat();
    this.addStyle();
  }

  handleEvents() {
    this.addEventListener('CHAT:BROADCAST', (e) => {
      const messages = this.root.getElementsByClassName('messages')[0];
      messages.appendChild(
        div('', [
          createElement('b', '', [
            createElement('i', '', [
              `${e.detail.player}:`
            ])
          ]),
          createElement('span', '', [
            `${e.detail.text}`
          ])
        ])
      );
      messages.scrollTop = messages.scrollHeight;
    });
  }

  getStyle() {
    return style({
      ':host': {
        '--color-green': '#2ecc71',
        '--color-dark-green': '#27ae60',
        '--color-yellow': '#f1c40f',
        '--color-black': '#000000',
        '--color-brown': '#855332',
        '--color-red': '#df0000',
        '--color-pink': '#f21fce',
        '--color-blue': '#3498db',
        '--color-dark-blue': '#2980b9',
        '--color-light-grey': '#ecf0f1',
        '--color-dark-grey': '#7f8c8d'
      },
      
      '.chat': {
        backgroundColor: 'var(--color-light-grey)',
        position: 'absolute',
        right: '0',
        bottom: '0',
        width: '300px',
        height: '250px',
        borderTopLeftRadius: '5px'
      },

      '.messages': {
        width: '100%',
        height: 'calc(250px - 31px)',
        overflowY: 'auto'
      },

      '.chat-box': {
        height: '31px',
        position: 'absolute',
        bottom: '0',
        width: '100%'
      },

      '.chat-box input[type="text"]': {
        width: 'calc(100% - 30px)',
        border: 'none',
        borderTop: '1px solid grey',
        height: '100%',
        fontSize: '24px',
        paddingLeft: '5px',
        boxSizing: 'border-box',
        outline: 'none',
        backgroundColor: 'transparent'
      },
      
      '.chat-box input[type="submit"]': {
        width: '30px',
        border: 'none',
        backgroundColor: 'var(--color-green)',
        height: '100%',
        position: 'absolute',
        outline: 'none'
      }
    });
  }
}

try {
  customElements.define('tri-chat', TriChat);
} catch (err) {
  const h3 = document.createElement('h3');
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
