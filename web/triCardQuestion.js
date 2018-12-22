import { div } from './naive.js';

class TriCardQuestion extends HTMLElement {
  connectedCallback() {
    this.createShadowRoot();
    const question = this.getAttribute('question');
    const answer = this.getAttribute('answer');
    this.render(question, answer);
  }

  addQuestion(root, question, answer) {
    var question = div('.question', [question]);
    var answer = div('.answer', [answer]);
    var action = div('.action', ['Vale']);
    action.addEventListener('click', (event) => {
      event.target.classList.add('active');
      let readDoneEvent = new CustomEvent('READ_DONE');
      this.dispatchEvent(readDoneEvent);
    });
    root.appendChild(question);
    root.appendChild(answer);
    root.appendChild(action);
  }

  addStyle() {
    const styleTag = document.createElement('style');
    styleTag.textContent = this.getStyle(this.size);
    this.shadowRoot.appendChild(styleTag);
  }

  render(question, answer) {
    var root = div('.card-question');
    this.shadowRoot.appendChild(root);
    this.addQuestion(root, question, answer);
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

      .card-question {
        background-color: #000000;
        font-family: 'Raleway', sans-serif;
        width: 400px;
        height: 300px;
        border-radius: 5px;
        padding: 25px;
        display: inline-block;
        position: relative;
        color: white;
        font-size: 20px;
        text-align: justify;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0px #000000;
      }

      .answer {
        font-size: 40px;
        color: var(--color-green);
        text-align: center;
        margin: 10px;
        font-weight: bold;
      }

      .action {
        width: 150px;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
        position: absolute;
        left: calc(50% - 150px / 2);
        bottom: 25px;
        color: #000000;
        background-color: var(--color-green);
        border: 2px solid var(--color-dark-green);
        font-weight: bold;
        cursor: pointer;
      }

      .action.active {
        background-color: var(--color-blue);
        border: 2px solid var(--color-dark-blue);
        cursor: not-allowed;
      }
    `
  }
}

try {
  customElements.define('tri-card-question', TriCardQuestion)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}

