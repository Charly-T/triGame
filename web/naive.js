function div(modifiers, children) {
  return createElement('div', modifiers, children);
}

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
      element.id = id[0];
    }
    const attrs = modifiers.match(/[^\[\]]+(?=\])/g);
    if (attrs) {
      for(let a in attrs) {
        let o = attrs[a].split('=');
        if (o[1]) {
          element.setAttribute(o[0], o[1]);
        } else {
          element.setAttribute(o[0], '');
        }
      }
    }
  }
  for(let i in children) {
    if (children[i] instanceof HTMLElement) {
      element.appendChild(children[i]);
    } else {
      element.textContent = children[i];
    }
  }
  return element;
}

export {
  div,
  createElement
};