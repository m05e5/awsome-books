if (localStorage.getItem('data') === null) {
  localStorage.setItem('data', '[]');
}

class BookList {
  constructor() {
    this.bookTemplate = {};
    this.books = [];
  }

  book(title, author) {
    this.bookTemplate.id = Date.now();
    this.bookTemplate.title = title;
    this.bookTemplate.author = author;
    return this.bookTemplate;
  }

  add(title, author) {
    this.books.push(this.book(title, author));
    this.save();
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== Number(id));
    this.save();
  }

  save() {
    localStorage.setItem('data', JSON.stringify(this.books));
    this.updateView();
  }

  retrieve() {
    this.books = JSON.parse(localStorage.getItem('data'));
  }

  updateView() {
    const books = document.getElementById('books');
    const liToRemove = document.querySelectorAll('li');
    liToRemove.forEach((item) => {
      item.remove();
    });
    this.retrieve();
    this.books.forEach((book) => {
      const li = document.createElement('li');
      const hr = document.createElement('hr');
      const removeBtn = document.createElement('input');
      removeBtn.id = book.id;
      removeBtn.className = 'remove-btn';
      removeBtn.addEventListener('click', (ev) => {
        this.remove(ev.target.id);
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
}

