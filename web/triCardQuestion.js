import { div } from './naive.js';

class TriCardQuestion extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const question = this.getAttribute('question');
    const answer = this.getAttribute('answer');
    const reading = this.hasAttribute('reading');
    this.render(question, answer, reading);
  }

  addQuestion(root, questionText, answerText, reading) {
    const question = div('.question', [questionText]);
    root.appendChild(question);
    const answer = div('.answer', [answerText]);
    root.appendChild(answer);
    if (!reading) {
      const action = div('.action', ['Vale']);
      action.addEventListener('click', (event) => {
        event.target.classList.add('active');
        let readDoneEvent = new CustomEvent('READ_DONE');
        this.dispatchEvent(readDoneEvent);
      });
      root.appendChild(action);
    }
  }

  addStyle() {
    const styleTag = document.createElement('style');
    styleTag.textContent = this.getStyle(this.size);
    this.shadow.appendChild(styleTag);
  }

  render(question, answer, reading) {
    const root = div('.card-question');
    this.shadow.appendChild(root);
    this.addQuestion(root, question, answer, reading);
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
        height: 20rem;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        color: white;
        font-size: 1.3rem;
        text-align: justify;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0px #000000;
      }

      .question {
        padding: 1rem;
      }

      .answer {
        font-size: 3rem;
        color: var(--color-green);
        text-align: center;
        padding: 1rem;
        font-weight: bold;
      }

      .action {
        width: 10rem;
        box-sizing: border-box;
        padding: 0.5rem;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
        position: absolute;
        bottom: 2rem;
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
    `;
  }
}

try {
  customElements.define('tri-card-question', TriCardQuestion);
} catch (err) {
  const h3 = document.createElement('h3');
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
