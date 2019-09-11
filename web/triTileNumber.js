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
    const numberDiv = div(`.number.number-${number}-${color.toLowerCase()}`);
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
        width: 100%;
        max-width: 75px;
        height: 0;
        padding: 0%;
        padding-bottom: calc(100% * 4 / 3);
        border-radius: 5px;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0px #000000;
      }

      .number {
        text-align: center;
        font-weight: bold;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      /*
      https://fonts.google.com/specimen/Barlow?selection.family=Barlow:700
      https://amio.github.io/embedded-google-fonts/
      https://editor.method.ac/
      */

      .number-1-green {
        background-image:url('/web/assets/1G.svg');
      }

      .number-2-yellow {
        background-image:url('/web/assets/2Y.svg');
      }

      .number-3-black {
        background-image:url('/web/assets/3B.svg');
      }

      .number-4-brown {
        background-image:url('/web/assets/4Br.svg');
      }

      .number-5-red {
        background-image:url('/web/assets/5R.svg');
      }

      .number-5-black {
        background-image:url('/web/assets/5B.svg');
      }

      .number-6-pink {
        background-image:url('/web/assets/6P.svg');
      }

      .number-6-green {
        background-image:url('/web/assets/6G.svg');
      }

      .number-7-yellow {
        background-image:url('/web/assets/7Y.svg');
      }

      .number-7-pink {
        background-image:url('/web/assets/7P.svg');
      }

      .number-7-blue {
        background-image:url('/web/assets/7Bl.svg');
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

