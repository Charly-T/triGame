import { div, createElement } from './naive.js';

class TriRack extends HTMLElement {
  connectedCallback() { 
    this.createShadowRoot();
    const name = this.getAttribute('name');
    const rack = this.getAttribute('rack');
    this.render(name, rack);
  }

  addNumbers(root, rack) {
    rack = rack.split(';');
    let numbers = [];
    for (let i = 0; i < rack.length; i++) {
      const tile = rack[i].split(',');
      numbers.push(createElement('tri-tile-number', `[number=${tile[0]}][color=${tile[1]}]`));
    }
    root.appendChild(div('.numbers', numbers));
  }

  addName(root, name) {
    root.appendChild(div('.name', [name]));
  }

  addStyle() {
    const styleTag = document.createElement('style');
    styleTag.textContent = this.getStyle(this.size);
    this.shadowRoot.appendChild(styleTag);
  }

  render(name, rack) {
    var root = div('.rack');
    this.shadowRoot.appendChild(root);
    this.addNumbers(root, rack);
    this.addName(root, name);
    this.addStyle();
  }

  getStyle() {
    return `
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
      
      .rack {
        width: 280px;
        display: inline-block;
        text-align: center;
        height: 150px;
        position: relative;
      }

      .rack:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 120px;
        background-color: var(--color-black);
        bottom: 0;
        left: 0;
        z-index: 0;
        border-radius: 10px 10px 5px 5px;
      }

      .name {
        color: white;
        z-index: 1;
        position: absolute;
        text-align: center;
        width: 100%;
        font-family: 'Raleway', sans-serif;
        font-size: 30px;
        margin-top: calc(15px/2);
      }

      tri-tile-number {
        margin-left: 10px;
        position: relative;
        z-index: 1;
      }

      tri-tile-number:first-child {
        margin-left: 0;
      }
    `
  }
}

try {
  customElements.define('tri-rack', TriRack)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}

