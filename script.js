if (localStorage.getItem('data') === null) {
  localStorage.setItem('data', '[]');
}

let bookList = [];

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

function addBooks(bookList) {
  const books = document.getElementById('books');
  const liToRemove = document.querySelectorAll('li');
  liToRemove.forEach((item) => {
    item.remove();
  });

  bookList.forEach((book) => {
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    const removeBtn = document.createElement('input');
    removeBtn.id = book.id;
    removeBtn.className = 'remove-btn';
    removeBtn.setAttribute('onclick', `removeBook( ${book.id} )`);
    removeBtn.setAttribute('type', 'button');
    removeBtn.setAttribute('value', 'Remove');
    const titleBlock = document.createElement('div');
    const title = document.createTextNode(book.title);
    titleBlock.appendChild(title);
    const authorBlock = document.createElement('div');
    const author = document.createTextNode(book.author);
    authorBlock.appendChild(author);

    li.appendChild(titleBlock);
    li.appendChild(authorBlock);
    li.appendChild(removeBtn);
    li.appendChild(hr);
    books.appendChild(li);
  });
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('data'));
}

function saveToLocalStorage(bookList) {
  localStorage.setItem('data', JSON.stringify(bookList));
  addBooks(getFromLocalStorage());
}

const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => {
  bookList = getFromLocalStorage();
  const id = Date.now();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const book = new Book(id, title, author);
  bookList.push(book);
  saveToLocalStorage(bookList);
});

function removeBook(id) {
  let bookList = getFromLocalStorage();
  bookList = bookList.filter((book) => book.id !== Number(id));
  saveToLocalStorage(bookList);
}

addBooks(getFromLocalStorage());

const removeBtns = document.querySelectorAll('remove-btn');
removeBtns.forEach((btn) => btn.addEventListener('click', (ev) => removeBook(ev.target.id)));