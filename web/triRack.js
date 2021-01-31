import { div, createElement, style } from './naive.js';

class TriRack extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.enableEvents();
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
    this.shadow.appendChild(this.getStyle());
  }

  render(name, rack) {
    const root = div('.rack');
    this.shadow.appendChild(root);
    this.addNumbers(root, rack);
    this.addName(root, name);
    this.addStyle();
  }

  enableEvents() {
    this.addEventListener('HIGHLIGHT', function (e) {
      if (e.detail) {
        this.shadowRoot.children[0].classList.add('highlight');
      } else {
        this.shadowRoot.children[0].classList.remove('highlight');
      }
    });
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
      
      '.rack': {
        width: 'calc((5rem * 3) + (2rem * 2))',
        display: 'inline-block',
        textAlign: 'center',
        height: '0',
        paddingBottom: '50%',
        position: 'relative'
      },

      '.rack:after': {
        content: '',
        position: 'absolute',
        width: '100%',
        height: '80%',
        backgroundColor: 'var(--color-black)',
        bottom: '0',
        left: '0',
        zIndex: '0',
        borderRadius: '10px 10px 5px 5px'
      },

      '.rack.highlight:after': {
        backgroundColor: 'var(--color-dark-green)'
      },

      '.name': {
        color: 'white',
        zIndex: '1',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        fontFamily: '"Raleway", sans-serif',
        fontSize: '2rem'
      },

      'tri-tile-number': {
        marginLeft: '0.8rem',
        position: 'relative',
        zIndex: '1'
      },

      'tri-tile-number:first-child': {
        marginLeft: '0'
      }
    });
  }
}

try {
  customElements.define('tri-rack', TriRack);
} catch (err) {
  const h3 = document.createElement('h3');
  h3.innerHTML =
    "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
  document.body.appendChild(h3);
}
