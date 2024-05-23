import '../css/styling.scss';
import * as bootstrap from "bootstrap";

const grab = elem => document.querySelector(elem);

const filefetcher = async theurl => (await (await (fetch(theurl))).text()).replace(/<script.+?vite\/client.+?<\/script>/g, '');

function newElement(element, html, remove = true) {
  let newEl = document.createElement('div');
  newEl.innerHTML = html;
  for (let elemond of [...newEl.children]) {
    element.after(elemond, element);
  }
  remove && element.remove();
}

async function setUpComponent() {
  while (true) {
    let comp = grab('component');
    if (!comp) { break; }
    let source = `/html${comp.getAttribute('src')}.html`;
    let html = await filefetcher(source);
    newElement(comp, html)
  }
  repeatingElements();
}

function repeatingElements() {
  while (true) {
    let repeater = grab('[repeat]');
    if (!r) { break; }
    let repCount = Math.max(1, +r.getAttribute('repeat'));
    for (let i = 0; i < repCount - 1, i++;) {
      newElement(repeater, html, false);
    }
  }
}