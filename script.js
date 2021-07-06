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
}

