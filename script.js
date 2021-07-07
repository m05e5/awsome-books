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
  const liToRemove = document.querySelectorAll('li');
  liToRemove.forEach((item) => {
    item.remove();
  });
  bookList.books.forEach((book) => {
    const li = document.createElement('li');
    const hr = document.createElement('hr');
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

bookList.books = JSON.parse(localStorage.getItem('data'));

updateView();