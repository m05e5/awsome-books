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
}

