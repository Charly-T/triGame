import { div } from './naive.js';

class TriTileNumber extends HTMLElement {
  connectedCallback() { 
    this.createShadowRoot();
    const number = this.getAttribute('number');
    const color = this.getAttribute('color');
    if (this.validateNumber(number, color)) {
      this.render(number, color);
    }
  }

  validateNumber(number, color) {
    const valid = {
      '1': ['GREEN'],
      '2': ['YELLOW'],
      '3': ['BLACK'],
      '4': ['BROWN'],
      '5': ['RED', 'BLACK'],
      '6': ['PINK', 'GREEN'],
      '7': ['YELLOW', 'PINK', 'BLUE']
    };
    return valid[number].indexOf(color) !== -1;
  }

  addNumber(root, number, color) {
    const numberDiv = div('.number.' + color.toLowerCase(), [number]);
    root.appendChild(numberDiv);
  }

  addStyle() {
    const styleTag = document.createElement('style');
    styleTag.textContent = this.getStyle(this.size);
    this.shadowRoot.appendChild(styleTag);
  }

  render(number, color) {
    const root = div('.tile-number');
    this.shadowRoot.appendChild(root);
    this.addNumber(root, number, color);
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

      .tile-number {
        background-color: #FFFFFF;
        font-family: 'Barlow', sans-serif;
        width: 75px;
        height: 100px;
        border-radius: 5px;
        padding: 5px;
        display: inline-block;
        position: relative;
        font-size: 20px;
        text-align: justify;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0px #000000;
      }

      .number {
        font-size: 76px;
        text-align: center;
        font-weight: bold;
        margin-top: -2px;
      }

      .green {
        color: var(--color-dark-green);
      }

      .yellow {
        color: var(--color-yellow);
      }

      .black {
        color: var(--color-black);
      }

      .brown {
        color: var(--color-brown);
      }

      .red {
        color: var(--color-red);
      }

      .pink {
        color: var(--color-pink);
      }

      .blue {
        color: var(--color-blue);
      }
    `
  }
}

try {
  customElements.define('tri-tile-number', TriTileNumber)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}

