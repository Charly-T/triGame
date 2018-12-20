import { div, createElement } from './naive.js';

class TriLogin extends HTMLElement {
  connectedCallback() { 
    this.createShadowRoot();
    this.render();
  }

  addForm(root) {
    var loginInput = createElement('input', '[type=text][placeholder=Nombre].login-input');
    var loginButton = createElement('button', '.login-button', [div('.icon-right')]);
    root.appendChild(loginInput);
    root.appendChild(loginButton);
    loginButton.addEventListener('click', () => {
      this.login(loginInput);
    });
  }

  addStyle() {
    const styleTag = document.createElement('style');
    styleTag.textContent = this.getStyle(this.size);
    this.shadowRoot.appendChild(styleTag);
  }

  login(loginInput) {
    var event = new CustomEvent('login', {
      detail: {
        name: loginInput.value
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    var root = div('.login');
    this.shadowRoot.appendChild(root);
    this.addForm(root);
    this.addStyle();
  }

  getStyle() {
    return `
      @import url('./font/fontello.css');

      :host {
        --color-green: #2ecc71;
        --color-dark-green: #27ae60;
        --color-yellow: #f1c40f;
        --color-black: #000000;
        --color-brown: #d35400;
        --color-red: #e74c3c;
        --color-pink: #9b59b6;
        --color-blue: #3498db;
        --color-dark-blue: #2980b9;
        --color-light-grey: #ecf0f1;
        --color-dark-grey: #7f8c8d;
      }
      
      .login {
        background-color: var(--color-light-grey);
        font-family: 'Barlow', sans-serif;
        width: 400px;
        height: 150px;
        border-radius: 5px;
        padding: 20px;
        display: inline-block;
        position: absolute;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0px #000000;
        left: calc(50% - 400px / 2);
        top: calc(50% - 150px / 2);
      }

      .login-input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid var(--color-dark-grey);
        outline: none;
        font-family: 'Raleway';
        font-size: 40px;
        width: 100%;
      }

      .login-button {
        background-color: var(--color-dark-green);
        border: none;
        width: 40px;
        height: 40px;
        font-size: 24px;
        position: absolute;
        right: 20px;
        bottom: 20px;
        color: var(--color-light-grey);
        cursor: pointer;
        outline: none;
      }
    `
  }
}

try {
  customElements.define('tri-login', TriLogin)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
