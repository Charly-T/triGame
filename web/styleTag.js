class Style {
  constructor(param) {
    this.cssProperties = [
      'align-content', 'align-items', 'align-self', 'all', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'azimuth', 'backface-visibility', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'background', 'bleed', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-bottom', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-source', 'border-image-slice', 'border-image-width', 'border-left-color', 'border-left-style', 'border-left-width', 'border-left', 'border-radius', 'border-right-color', 'border-right-style', 'border-right-width', 'border-right', 'border-spacing', 'border-style', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-top', 'border-width', 'border', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'caret-color', 'clear', 'clip', 'color', 'columns', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'content', 'counter-increment', 'counter-reset', 'cue-after', 'cue-before', 'cue', 'cursor', 'direction', 'display', 'elevation', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'font-feature-settings', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font-family', 'font-kerning', 'font-language-override', 'font-size-adjust', 'font-size', 'font-stretch', 'font-style', 'font-synthesis', 'font-variant', 'font-variant-alternates', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-weight', 'font', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column-end', 'grid-column-gap', 'grid-column-start', 'grid-column', 'grid-gap', 'grid-row-end', 'grid-row-gap', 'grid-row-start', 'grid-row', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'grid-template', 'grid', 'hanging-punctuation', 'height', 'hyphens', 'isolation', 'justify-content', 'justify-items', 'justify-self', 'left', 'letter-spacing', 'line-break', 'line-height', 'list-style-image', 'list-style-position', 'list-style-type', 'list-style', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'margin', 'marker-offset', 'marks', 'max-height', 'max-width', 'min-height', 'min-width', 'mix-blend-mode', 'nav-up', 'nav-down', 'nav-left', 'nav-right', 'opacity', 'order', 'orphans', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'outline', 'overflow', 'overflow-wrap', 'overflow-x', 'overflow-y', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'padding', 'page-break-after', 'page-break-before', 'page-break-inside', 'page', 'pause-after', 'pause-before', 'pause', 'perspective', 'perspective-origin', 'pitch-range', 'pitch', 'place-content', 'place-items', 'place-self', 'play-during', 'pointer-events', 'position', 'quotes', 'resize', 'rest-after', 'rest-before', 'rest', 'richness', 'right', 'size', 'speak-header', 'speak-numeral', 'speak-punctuation', 'speak', 'speech-rate', 'stress', 'tab-size', 'table-layout', 'text-align', 'text-align-last', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-skip', 'text-decoration-style', 'text-indent', 'text-overflow', 'text-shadow', 'text-transform', 'text-underline-position', 'top', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'vertical-align', 'visibility', 'voice-balance', 'voice-duration', 'voice-family', 'voice-pitch', 'voice-range', 'voice-rate', 'voice-stress', 'voice-volume', 'volume', 'white-space', 'widows', 'width', 'will-change', 'word-break', 'word-spacing', 'word-wrap', 'z-index'
    ]
    this.style = param;
  }

  generateStyle() {
    const unnestedStyle = this.unnest(this.style);
    return this.generateProperties(unnestedStyle);
  }

  generateProperties(properties, stackedProperties = []) {
    let props = '';
    for (const camelProp in properties) {
      const prop = this.toDashCase(camelProp);
      if (typeof properties[camelProp] === 'object') {
        stackedProperties.push(prop);
        props += `${prop}{${this.generateProperties(properties[camelProp], stackedProperties)}}`;
        stackedProperties.pop();
      } else {
        if (!this.cssProperties.includes(prop)) {
          throw new Error(`Property ${camelProp} is not a valid css property`);
        }
        props += `${prop}:${properties[camelProp]};`;
      }
    }
    return props;
  }
  
  parseName(current, parent) {
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
  
  unnest(obj, parent) {
    const res = {};
    Object.keys(obj).forEach(prop => {
      if (typeof obj[prop] === 'string') {
        if (!res[parent]) {
          res[parent] = {};
        }
        res[parent][prop] = obj[prop];
      } else if (parent && parent.substr(0, 6) === '@media') {
        const un = this.unnest(obj[prop], prop);
        Object.keys(un).forEach(() => {
          if (!res[parent]) {
            res[parent] = {};
          }
          res[parent] = un;
        });
      } else {
        const newName = this.parseName(prop, parent);
        const un = this.unnest(obj[prop], newName);
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

  toDashCase(key) {
    return key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }

  toStyleTag() {
    return '<style>' + this.generateStyle() + '</style>';
  }

  toStyleElement() {
    const style = document.createElement('style');
    style.innerText = this.generateStyle();
    return style;
  }
}

export {
  Style
};