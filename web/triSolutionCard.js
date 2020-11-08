import { div, createElement } from './naive.js';

class TriSolutionCard extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {}

  addStyle() {
    const styleTag = document.createElement('style');
    styleTag.textContent = this.getStyle(this.size);
    this.shadow.appendChild(styleTag);
  }

  addNumberEventListeners(number) {
    number.addEventListener('click', (event) => {
      const selectedAction = this.shadowRoot.children[0].getElementsByClassName('selected')[0];
      const selected = selectedAction.className
        .replace('action', '')
        .replace('selected', '')
        .trim();
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
    this.shadow.appendChild(div);
    this.addNumbers(div);
    this.addStyle();
  }

  addNumbers(father) {
    for (let i = 1; i <= 7; i++) {
      const row = div('.row');
      for (let j = 1; j <= i; j++) {
        const number = div(`.number.number${i}.col${j}`, [i]);
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
    ];
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
        --number-color-brown: #855332;
        --number-color-red: #df0000;
        --number-color-pink: #f21fce;
        --number-color-blue: #3498db;
      }
      
      .card {
        background-color: #ecf0f1;
        font-family: 'Barlow', sans-serif;
        width: 20em;
        height: 0;
        border-radius: 5px;
        padding-bottom: 120%;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0px #000000;
      }
      
      .row {
        height: 2em;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .row:first-child {
        margin-top: 0.5em;
      }
      
      .number {
        display: inline-block;
        width: 1em;
        font-weight: bold;
        font-size: 2em;
        cursor: pointer;
        position: relative;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .number1.col1 { color: var(--number-color-green); }
      .number2.col1 { color: var(--number-color-yellow); }
      .number2.col2 { color: var(--number-color-yellow); }
      .number3.col1 { color: var(--number-color-black); }
      .number3.col2 { color: var(--number-color-black); }
      .number3.col3 { color: var(--number-color-black); }
      .number4.col1 { color: var(--number-color-brown); }
      .number4.col2 { color: var(--number-color-brown); }
      .number4.col3 { color: var(--number-color-brown); }
      .number4.col4 { color: var(--number-color-brown); }
      .number5.col1 { color: var(--number-color-red); }
      .number5.col2 { color: var(--number-color-red); }
      .number5.col3 { color: var(--number-color-red); }
      .number5.col4 { color: var(--number-color-red); }
      .number5.col5 { color: var(--number-color-black); }
      .number6.col1 { color: var(--number-color-pink); }
      .number6.col2 { color: var(--number-color-pink); }
      .number6.col3 { color: var(--number-color-pink); }
      .number6.col4 { color: var(--number-color-green); }
      .number6.col5 { color: var(--number-color-green); }
      .number6.col6 { color: var(--number-color-green); }
      .number7.col1 { color: var(--number-color-yellow); }
      .number7.col2 { color: var(--number-color-yellow); }
      .number7.col3 { color: var(--number-color-pink); }
      .number7.col4 { color: var(--number-color-blue); }
      .number7.col5 { color: var(--number-color-blue); }
      .number7.col6 { color: var(--number-color-blue); }
      .number7.col7 { color: var(--number-color-blue); }
      
      .number.cross:before,
      .number.square:before,
      .number.circle:before {
        font-family: "fontello";
        font-style: normal;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        font-size: 1em;
        color: black;
      }
      
      .number.cross:before {
        content: '\\e805';
      }
      
      .number.square:before {
        font-size: 1.2em;
        top: 0.1em;
        content: '\\f096';
      }
      
      .number.circle:before {
        font-size: 1.2em;
        content: '\\f1db';
      }

      textarea {
        width: calc(100% - 2em);
        height: 5em;
        margin: 1em;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        resize: none;
        outline: none;
        padding: 0.5em;
        font-family: 'Raleway', sans-serif;
        background-color: transparent;
        box-sizing: border-box;
        font-size: 1em;
      }
      
      .action-row {
        height: 2em;
        position: absolute;
        bottom: 0.5em;
        user-select: none;
        width: 100%;
      }
      
      .action {
        width: 2em;
        height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
      }
      
      .action.selected {
        color: var(--number-color-red);
      }
      
      .action.cross,
      .action.circle,
      .action.square {
        font-size: 2em;
      }
    `;
  }
}

try {
  customElements.define('tri-solution-card', TriSolutionCard);
} catch (err) {
  const h3 = document.createElement('h3');
  h3.innerHTML =
    "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
