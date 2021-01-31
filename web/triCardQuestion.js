import { div, style } from './naive.js';

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
    } else {
      const action = div('.action.active', ['Estas leyendo']);
      root.appendChild(action);
    }
  }

  addStyle() {
    this.shadow.appendChild(this.getStyle());
  }

  render(question, answer, reading) {
    const root = div('.card-question');
    this.shadow.appendChild(root);
    this.addQuestion(root, question, answer, reading);
    this.addStyle();
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

      '.card-question': {
        backgroundColor: '#000000',
        fontFamily: '"Raleway", sans-serif',
        height: '20rem',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        color: 'white',
        fontSize: '1.3rem',
        textAlign: 'justify',
        boxSizing: 'border-box',
        boxShadow: '0 0 10px 0px #000000'
      },

      '.question': {
        padding: '1rem'
      },

      '.answer': {
        fontSize: '3rem',
        color: 'var(--color-green)',
        textAlign: 'center',
        padding: '1rem',
        fontWeight: 'bold'
      },

      '.action': {
        width: '10rem',
        boxSizing: 'border-box',
        padding: '0.5rem',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '0 auto',
        position: 'absolute',
        bottom: '2rem',
        color: '#000000',
        backgroundColor: 'var(--color-green)',
        border: '2px solid var(--color-dark-green)',
        fontWeight: 'bold',
        cursor: 'pointer'
      },

      '.action.active': {
        backgroundColor: 'var(--color-blue)',
        border: '2px solid var(--color-dark-blue)',
        cursor: 'not-allowed'
      }
    });
  }
}

try {
  customElements.define('tri-card-question', TriCardQuestion);
} catch (err) {
  const h3 = document.createElement('h3');
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
