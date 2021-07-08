import { DateTime } from "./lib/luxon.js";

class BookList {
  constructor() {
    this.books = [];
  }

  add(title, author) {
    this.books = this.books.concat({ id: Date.now(), title, author });
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== Number(id));
  }
}

const bookList = new BookList();

function updateView() {
  const books = document.getElementById('books');
  if (bookList.books.length === 0) {
    books.classList.remove('black-border');
  } else {
    books.classList.add('black-border');
  }
  const liToRemove = document.querySelectorAll('.books li');
  liToRemove.forEach((item) => {
    item.remove();
  });
  let i = 0;
  bookList.books.forEach((book) => {
    const li = document.createElement('li');
    if (i % 2 === 0) {
      li.className = 'dark-bg';
    }
    i += 1;
    const removeBtn = document.createElement('input');
    removeBtn.id = book.id;
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', (ev) => {
      bookList.remove(ev.target.id);
      localStorage.setItem('data', JSON.stringify(bookList.books));
      this.updateView();
    });
    removeBtn.setAttribute('type', 'button');
    removeBtn.setAttribute('value', 'Remove');
    const bookBlock = document.createElement('div');
    bookBlock.innerHTML = `"${book.title}" by ${book.author}`;
    li.appendChild(bookBlock);
    li.appendChild(removeBtn);
    books.appendChild(li);
  });
}

const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  bookList.add(title, author);
  localStorage.setItem('data', JSON.stringify(bookList.books));
  updateView();
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});

if (localStorage.getItem('data') === null) {
  localStorage.setItem('data', '[]');
}

document.querySelector('.date').innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);

bookList.books = JSON.parse(localStorage.getItem('data'));
const list = document.getElementById('list');
const addNew = document.getElementById('add-new');
const contact = document.getElementById('contact');

list.onclick = () => {
  document.getElementById('book-list').style.display = 'block';
  document.getElementById('form').style.display = 'none';
  document.getElementById('contact-info').style.display = 'none';
  list.style.color = 'blue';
  addNew.style.color = 'black';
  contact.style.color = 'black';
}

addNew.onclick = () => {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('form').style.display = 'block';
  document.getElementById('contact-info').style.display = 'none';
  list.style.color = 'black';
  addNew.style.color = 'blue';
  contact.style.color = 'black';
}

contact.onclick = () => {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('form').style.display = 'none';
  document.getElementById('contact-info').style.display = 'block';
  list.style.color = 'black';
  addNew.style.color = 'black';
  contact.style.color = 'blue';
}




updateView();