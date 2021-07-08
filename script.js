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

bookList.books = JSON.parse(localStorage.getItem('data'));

updateView();