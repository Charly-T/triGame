import { div, createElement, style } from './naive.js';

class TriLogin extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.handleEvents();
  }

  addForm() {
    const loginInput = createElement('input', '[type=text][placeholder=Nombre].login-input');
    const loginButton = createElement('button', '.login-button', [div('.icon-right')]);
    this.root.appendChild(div('.login-form', [loginInput, loginButton]));
    loginButton.addEventListener('click', () => {
      loginButton.setAttribute('disabled', '');
      this.login(loginInput.value);
    });
  }

  addStyle() {
    this.shadow.appendChild(this.getStyle());
  }

  login(user) {
    const event = new CustomEvent('login', {
      detail: {
        name: user
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    this.root = div('.login');
    this.shadow.appendChild(this.root);
    this.addForm();
    this.addStyle();
  }

  handleEvents() {
    this.addEventListener('JOINED', function (e) {
      this.root.getElementsByClassName('login-form')[0].classList.add('hide');
      if (this.root.getElementsByClassName('waiting').length === 0) {
        this.root.appendChild(div('.waiting', ['Esperando al resto de jugadores']));
      }
      if (this.root.getElementsByClassName('players').length > 0) {
        this.root.getElementsByClassName('players')[0].remove();
      }
      this.root.appendChild(div('.players', e.detail.players.map(player => div('.player', [player]))));
    });
  }

  getStyle() {
    return style({
      '@import': ['url("./font/fontello.css")'],

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
      
      '.login': {
        backgroundColor: 'var(--color-light-grey)',
        fontFamily: '"Barlow", sans-serif',
        width: '400px',
        height: '150px',
        borderRadius: '5px',
        padding: '20px',
        display: 'inline-block',
        position: 'absolute',
        boxSizing: 'border-box',
        boxShadow: '0 0 10px 0px #000000',
        left: 'calc(50% - 400px / 2)',
        top: 'calc(50% - 150px / 2)'
      },

      '.login-form.hide': {
        display: 'none'
      },

      '.login-input': {
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--color-dark-grey)',
        outline: 'none',
        fontFamily: '"Raleway"',
        fontSize: '40px',
        width: '100%'
      },

      '.login-button': {
        backgroundColor: 'var(--color-dark-green)',
        border: 'none',
        width: '40px',
        height: '40px',
        fontSize: '24px',
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        color: 'var(--color-light-grey)',
        cursor: 'pointer',
        outline: 'none'
      }
    });
  }
}

try {
  customElements.define('tri-login', TriLogin);
} catch (err) {
  const h3 = document.createElement('h3');
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
