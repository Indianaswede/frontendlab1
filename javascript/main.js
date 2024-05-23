import '../css/styling.scss';
import * as bootstrap from "bootstrap";

const grab = el => document.querySelector(el);

const filefetcher = async theurl => (await (await (fetch(theurl))).text()).replace(/<script.+?vite\/client.+?<\/script>/g, '');

function newElement(element, html, remove = true) {
  let newEl = document.createElement('div');
  newEl.innerHTML = html;
  for (let elemond of [...newEl.children]) {
    element.after(elemond, element);
  }
  remove && element.remove();
}