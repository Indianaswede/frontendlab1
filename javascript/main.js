import '../css/styling.scss';
import * as bootstrap from "bootstrap";

const $ = el => document.querySelector(el);

const filefetcher = async url => (await (await (fetch(url))).text()).replace(/<script.+?vite\/client.+?<\/script>/g, '');

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
    let comp = $('component');
    if (!comp) { break; }
    let source = `/html${comp.getAttribute('src')}.html`;
    let html = await filefetcher(source);
    newElement(comp, html)
  }
  repeatingElements();
}

function repeatingElements() {
  while (true) {
    let repeater = $('[repeat]');
    if (!r) { break; }
    let repCount = Math.max(1, +r.getAttribute('repeat'));
    for (let i = 0; i < repCount - 1, i++;) {
      newElement(repeater, html, false);
    }
  }
}

$('body').addEventListener('click', e => {
  let thisElement = e.target.closest('a');
  if (!thisElement) { return; }
  let href = thisElement.getAttribute('href');
  if (href.indexOf('http') === 0) { return; }
  if (href === '#') { return; }
  e.preventDefault();
  history.pushState(null, null, href);
  PageLoad(href);
}
);

window.addEventListener('popstate', () => PageLoad())

const Cache = {};
async function PageLoad(src = location.pathname) {
  let truesrc = src === '/' ? '/start' : src;
  src = `/html/pages${truesrc}.html`;
  let html = Cache[src] || await filefetcher(src);
  Cache[src] = html;
  $('main').innerHTML = html;
  setUpComponent();

}

setUpComponent().then(x => PageLoad('/'));