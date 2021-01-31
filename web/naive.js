const cssProperties = [
      'align-content', 'align-items', 'align-self', 'all', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'azimuth', 'backface-visibility', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'background', 'bleed', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-bottom', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-source', 'border-image-slice', 'border-image-width', 'border-left-color', 'border-left-style', 'border-left-width', 'border-left', 'border-radius', 'border-right-color', 'border-right-style', 'border-right-width', 'border-right', 'border-spacing', 'border-style', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-top', 'border-width', 'border', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'caret-color', 'clear', 'clip', 'color', 'columns', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'content', 'counter-increment', 'counter-reset', 'cue-after', 'cue-before', 'cue', 'cursor', 'direction', 'display', 'elevation', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'font-feature-settings', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font-family', 'font-kerning', 'font-language-override', 'font-size-adjust', 'font-size', 'font-stretch', 'font-style', 'font-synthesis', 'font-variant', 'font-variant-alternates', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-weight', 'font', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column-end', 'grid-column-gap', 'grid-column-start', 'grid-column', 'grid-gap', 'grid-row-end', 'grid-row-gap', 'grid-row-start', 'grid-row', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'grid-template', 'grid', 'hanging-punctuation', 'height', 'hyphens', 'isolation', 'justify-content', 'justify-items', 'justify-self', 'left', 'letter-spacing', 'line-break', 'line-height', 'list-style-image', 'list-style-position', 'list-style-type', 'list-style', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'margin', 'marker-offset', 'marks', 'max-height', 'max-width', 'min-height', 'min-width', 'mix-blend-mode', 'nav-up', 'nav-down', 'nav-left', 'nav-right', 'opacity', 'order', 'orphans', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'outline', 'overflow', 'overflow-wrap', 'overflow-x', 'overflow-y', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'padding', 'page-break-after', 'page-break-before', 'page-break-inside', 'page', 'pause-after', 'pause-before', 'pause', 'perspective', 'perspective-origin', 'pitch-range', 'pitch', 'place-content', 'place-items', 'place-self', 'play-during', 'pointer-events', 'position', 'quotes', 'resize', 'rest-after', 'rest-before', 'rest', 'richness', 'right', 'size', 'speak-header', 'speak-numeral', 'speak-punctuation', 'speak', 'speech-rate', 'stress', 'tab-size', 'table-layout', 'text-align', 'text-align-last', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-skip', 'text-decoration-style', 'text-indent', 'text-overflow', 'text-shadow', 'text-transform', 'text-underline-position', 'top', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'user-select', 'vertical-align', 'visibility', 'voice-balance', 'voice-duration', 'voice-family', 'voice-pitch', 'voice-range', 'voice-rate', 'voice-stress', 'voice-volume', 'volume', 'white-space', 'widows', 'width', 'will-change', 'word-break', 'word-spacing', 'word-wrap', 'z-index', '-webkit-font-smoothing', '-moz-osx-font-smoothing'
    ];

/**
 * Wrapper of createElement for a div element
 * @param modifiers {string}
 * @param children {(HTMLElement | string)[]}
 * @returns HTMLElement
 */
function div(modifiers, children) {
  return createElement('div', modifiers, children);
}

/**
 * Wrapper of createElement for a span element
 * @param modifiers {string}
 * @param children {(HTMLElement | string)[]}
 * @returns HTMLElement
 */
function span(modifiers, children) {
  return createElement('span', modifiers, children);
}

/**
 * Wrapper of native createElement with properties setted like css selectors and childrens as array
 * @param tag {string}
 * @param modifiers {string}
 * @param children {(HTMLElement | string)[]}
 * @returns {HTMLElement}
 */
function createElement(tag, modifiers, children) {
  const element = document.createElement(tag);
  if (modifiers) {
    const classes = modifiers.match(/\.[a-z0-9\-]+/g);
    if (classes) {
      for (let c in classes) {
        element.classList.add(classes[c].replace('.', ''));
      }
    }
    const id = modifiers.match(/#[a-z0-9\-]+/g);
    if (id) {
      element.id = id[0].substr(1);
    }
    const attrs = modifiers.match(/[^\[\]]+(?=\])/g);
    if (attrs) {
      for (let a in attrs) {
        let o = attrs[a].split('=');
        if (o[1]) {
          element.setAttribute(o[0], o[1]);
        } else {
          element.setAttribute(o[0], '');
        }
      }
    }
  }
  for (let i in children) {
    let child = children[i];
    if (!(child instanceof HTMLElement)) {
      child = document.createTextNode(child);
    }
    element.appendChild(child);
  }
  return element;
}

/**
 * @param content {any}
 */
function style(content) {
  const styleItem = document.createElement('style');
  const unnestedStyle = unnest(content);
  const props = generateProperties(unnestedStyle);
  styleItem.appendChild(document.createTextNode(props));
  return styleItem;
}

function unnest(obj, parent) {
  const res = {};
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'string') {
      if (!res[parent]) {
        res[parent] = {};
      }
      res[parent][prop] = obj[prop];
    } else if (parent && parent.substr(0, 6) === '@media') {
      const un = unnest(obj[prop], prop);
      Object.keys(un).forEach(() => {
        if (!res[parent]) {
          res[parent] = {};
        }
        res[parent] = un;
      });
    } else if (prop === '@import') {
      if (!Array.isArray(obj[prop])) {
        throw(new Error(`@import must receive an array of strings`));
      }
      if (parent !== undefined) {
        throw(new Error('@import must be on the root object'));
      }
      res['@import'] = obj[prop];
    } else {
      const newName = parseName(prop, parent);
      const un = unnest(obj[prop], newName);
      Object.keys(un).forEach(unprop => {
        if (!res[unprop]) {
          res[unprop] = {};
        }
        res[unprop] = un[unprop];
      });
    }
  })
  return res;
}

function generateProperties(properties, stackedProperties = []) {
  let props = '';
  for (const camelProp in properties) {
    const prop = toDashCase(camelProp);
    if (camelProp === '@import') {
      properties[camelProp].forEach(i => {
        props += `@import ${i};`;
      });
    } else if (typeof properties[camelProp] === 'object') {
      stackedProperties.push(prop);
      props += `${prop}{${generateProperties(properties[camelProp], stackedProperties)}}`;
      stackedProperties.pop();
    } else {
      if (
        !cssProperties.includes(prop) &&
        prop.substr(0, 2) !== '--'
      ) {
        throw new Error(`Property ${camelProp} is not a valid css property`);
      }
      props += `${prop}:${properties[camelProp]};`;
    }
  }
  return props;
}

function parseName(current, parent) {
  let newCurrent = current;
  let joinString;
  if (current.charAt(0) === '&') {
    newCurrent = current.slice(1);
    joinString = '';
  } else {
    joinString = ' ';
  }
  return [parent, newCurrent].join(joinString).trim();
}

function toDashCase(key) {
  return key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export {
  div,
  span,
  createElement,
  style
};
