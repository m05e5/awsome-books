if (localStorage.getItem('data') === null) {
  localStorage.setItem('data', '[]');
}
const add_btn = document.getElementById('add');
function Book(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function saveToLocalStorage(bookList) {
  localStorage.clear();
  myList = JSON.stringify(bookList);
  localStorage.setItem('data', myList);
}

function getFromLocalStorage() {
  if (localStorage.getItem('data') !== null) {
    return JSON.parse(localStorage.getItem('data'));
  }
}
add_btn.addEventListener('click', () => {
  let bookList = getFromLocalStorage();
  let id = Date.now();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let book = new Book(id, title, author);
  bookList.push(book);
  saveToLocalStorage(bookList);
  addBooks();
})

function removeBook(id) {
  let bookList = getFromLocalStorage();
  bookList = bookList.filter(book => book.id != id);
  saveToLocalStorage(bookList);
  addBooks();
}

function addBooks() {
  let bookList = getFromLocalStorage();
  const books = document.getElementById('books');
  const liToRemove = document.querySelectorAll('li');
  liToRemove.forEach((item) => {
    item.remove();
  })

  for (const book of bookList) {
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    const removeBtn = document.createElement('input');
    removeBtn.setAttribute('onclick', 'removeBook(' + book.id + ')');
    removeBtn.setAttribute('type', 'button');
    removeBtn.setAttribute('value', 'Remove');
    const titleBlock = document.createElement('div')
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
  }
}

addBooks();