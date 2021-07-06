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
}

