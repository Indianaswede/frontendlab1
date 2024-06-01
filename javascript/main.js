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
    if (!repeater) { break; }
    let repCount = Math.max(1, +repeater.getAttribute('repeat'));
    repeater.removeAttribute('repeat')
    for (let i = 0; i < repCount - 1, i++;) {
      newElement(repeater, html, false);
    }
  }
}

$('body').addEventListener('click', e => {
  let thisLink = e.target.closest('a');
  if (!thisLink) { return; }
  let href = thisLink.getAttribute('href');
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
  if (src === '/start' || '/filter') {

    makeDisplayList();
  }
}

let books;
const cart = {};
//JSON Reader
async function getBooks() {
  let raw = await fetch('books.json');
  books = await raw.json();

  msg = '';
  for (const book in books) {
    msg += `${book.title}, `
  }
  alert(msg);
}


//Display List
function makeDisplayList() {
  let html = '';
  for (let book of books) {
    alert("in the loop")
    html += `
      <div class="book">
        <img src="" alt="Book Cover">
        <h3>${book.title}</h3>
        <h5>${book.author}</h5>
        <a class="${book.id}" href="/detailed">More Details</a>
        <button onclick="addToCart(${book})">Buy!</button>
      </div>
    `;
  }
  alert(html);
  document.querySelector('section').innerHTML = html;
}

//Search Function/filter books

//Get Detailed Display
function makeDetailedDisplay(book) {
  let page = $('section');
  let html;
  html += `
    <div>
      <h3>${book.title}</h3>
      <h5>${book.author}</h5>
      <p>description:${book.description}</p>
      <p>Category:${book.category}</p>
      <p>Price:${book.price}</p>
      <button onclick="addToCart(${book})">Buy!</button>
    </div>
    `;
  page.innerHTML = html;
}

//Add to cart
function addToCart(book) {
  if (cart.some(purch => purch.book === book)) {
    purch.amount++;
  }
  else {
    let purchase = {
      bookbuy: book,
      amount: 1
    }
    cart.push(purchase);
  }
}

//hide/show shopping cart
//function cart() {
//
//
//  if (cart.length === 0) { return; }
//  else {
//    html = "";
//    var total = 0;
//    for (let purchase in cart) {
//      var rowsum = purchase.amount * purchase.bookbuy.price;
//      total += rowsum;
//      html += `
//      <div>
//        <h3>${purchase.bookbuy.title}</h3>
//        <h5>${purchase.bookbuy.author}</h5>
//        <p>amount:${purchase.amount}</p>
//        <p>Price:${rowsum}</p>
//      </div>
//      `;
//    }
//    html += '<p>Total:${total}</p>'
//  }
//}


getBooks();
setUpComponent().then(x => PageLoad());