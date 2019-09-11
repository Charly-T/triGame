import { div, createElement } from './naive.js';

class TriSolutionCard extends HTMLElement {
  connectedCallback() {
    this.createShadowRoot();
    this.render();
  }

  addStyle() {
    const styleTag = document.createElement('style');
    styleTag.textContent = this.getStyle(this.size);
    this.shadowRoot.appendChild(styleTag);
  }

  addNumberEventListeners(number) {
    number.addEventListener('click', () => {
      const selectedAction = this.shadowRoot.children[0].getElementsByClassName('selected')[0];
      const selected = selectedAction.className.replace('action', '').replace('selected', '').trim();
      let wasActive = event.target.classList.contains(selected);
      event.target.classList
        .remove('circle');
      event.target.classList
        .remove('square');
      event.target.classList
        .remove('cross');
      if (!wasActive) {
        event.target.classList.add(selected);
      }
    });
  }

  addActionEventListeners(actions) {
    for (let action of actions) { 
      action.addEventListener('click', () => {
        for (let element of actions) {
          element.classList.remove('selected');
        }
        action.classList.add('selected');
      });
    }
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('card');
    this.shadowRoot.appendChild(div);
    this.addNumbers(div);
    this.addStyle();
  }

  addNumbers(father) {
    for (let i = 1; i <= 7; i++) {
      const row = div('.row');
      for (let j = 1; j <= i; j++) {
        const number = div(`.number.number${i}.col${j}`,['']);
        this.addNumberEventListeners(number);
        row.appendChild(number);
      }
      father.appendChild(row);
    }
    father.appendChild(createElement('textarea'));
    const actions = [
      div('.action.circle.selected', [
        div('.icon-circle')
      ]),
      div('.action.square', [
        div('.icon-square')
      ]),
      div('.action.cross', [
        div('.icon-cross')
      ])
    ]
    this.addActionEventListeners(actions);
    const rowAction = div('.row.action-row', actions);
    father.appendChild(rowAction);
  }

  getStyle() {
    return `
      @import url('./font/fontello.css');

      :host {
        --number-color-green: #27ae60;
        --number-color-yellow: #f1c40f;
        --number-color-black: #000000;
        --number-color-brown: #d35400;
        --number-color-red: #e74c3c;
        --number-color-pink: #9b59b6;
        --number-color-blue: #3498db;
      }
      
      .card {
        background-color: #ecf0f1;
        font-family: 'Barlow', sans-serif;
        width: 100%;
        max-width: 300px;
        height: 0;
        border-radius: 5px;
        padding: 5px;
        padding-bottom: calc(100% * 1.25);
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0px #000000;
      }
      
      .row {
        user-select: none;
        display: flex;
        justify-content: center;
        position: relative;
      }
      
      .number {
        display: inline-block;
        width: 10%;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        position: relative;
        user-select: none;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        padding-bottom: 10%;
      }
      
      .number1.col1 { background-image:url('/web/assets/1G.svg'); }
      .number2.col1,
      .number2.col2 { background-image:url('/web/assets/2Y.svg'); }
      .number3.col1,
      .number3.col2,
      .number3.col3 { background-image:url('/web/assets/3B.svg'); }
      .number4.col1,
      .number4.col2,
      .number4.col3,
      .number4.col4 { background-image:url('/web/assets/4Br.svg'); }
      .number5.col1,
      .number5.col2,
      .number5.col3,
      .number5.col4 { background-image:url('/web/assets/5R.svg'); }
      .number5.col5 { background-image:url('/web/assets/5B.svg'); }
      .number6.col1,
      .number6.col2,
      .number6.col3 { background-image:url('/web/assets/6P.svg'); }
      .number6.col4,
      .number6.col5,
      .number6.col6 { background-image:url('/web/assets/6G.svg'); }
      .number7.col1,
      .number7.col2 { background-image:url('/web/assets/7Y.svg'); }
      .number7.col3 { background-image:url('/web/assets/7P.svg'); }
      .number7.col4,
      .number7.col5,
      .number7.col6,
      .number7.col7 { background-image:url('/web/assets/7Bl.svg'); }
      
      .number.cross:before,
      .number.square:before,
      .number.circle:before {
        font-family: "fontello";
        font-style: normal;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        font-size: 38px;
        color: black;
      }
      
      .number.cross:before {
        content: '\\e805';
        top: 1px;
        left: 5px;
      }
      
      .number.square:before {
        content: '\\f096';
        top: 2px;
        left: 3px;
      }
      
      .number.circle:before {
        content: '\\f1db';
        top: 0px;
        left: 1px;
      }

      textarea {
        width: calc(100% - 12px);
        height: 80px;
        margin: 10px 0px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        resize: none;
        outline: none;
        padding: 5px;
        font-family: 'Raleway', sans-serif;
        background-color: transparent;
      }
      
      .action-row {
        height: 48px;
        position: absolute;
        bottom: 5px;
        width: calc(100% - 10px);
        user-select: none;
      }
      
      .action {
        width: 40px;
        height: 48px;
        display: inline-block;
        cursor: pointer;
        user-select: none;
      }
      
      .action.selected {
        color: var(--number-color-red);
      }
      
      .action.cross,
      .action.circle,
      .action.square {
        font-size: 40px;
      }
      
      .scratch {
        width: 30px;
        height: 30px;
        background-image: url('./doodles-36-512.png');
        background-size: cover;
      }
    `
  }
}

try {
  customElements.define('tri-solution-card', TriSolutionCard)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}

