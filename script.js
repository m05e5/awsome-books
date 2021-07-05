if(localStorage.getItem('data') === null){
    localStorage.setItem('data', '[]');
}
const add_btn = document.getElementById('add');
// const book = Object.create( {} );
function Book( id, title, author ) {
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
    if(localStorage.getItem('data') !== null){
        return JSON.parse(localStorage.getItem('data'));
    }
}
add_btn.addEventListener('click', () => {
    let bookList = getFromLocalStorage();
    let id = Date.now();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let book =new Book(id, title, author);
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
  const li_to_remove = document.querySelectorAll('li')
  li_to_remove.forEach( (item) => {item.remove()})

  for(let book of bookList ) {
    const li = document.createElement('li');
    const br = document.createElement('BR');
    const hr = document.createElement('hr');
    const remove_btn = document.createElement('input');
    remove_btn.setAttribute('onclick', 'removeBook(' + book.id + ')');
    remove_btn.setAttribute('type', 'button');
    remove_btn.setAttribute('value', 'Remove');
    const title_block = document.createElement('div')
    const title = document.createTextNode(book.title);
    title_block.appendChild(title);
    const author_block = document.createElement('div');
    const author = document.createTextNode(book.author);
    author_block.appendChild(author);

    li.appendChild(title_block);
    li.appendChild(author_block);
    li.appendChild(remove_btn);
    li.appendChild(hr);
    books.appendChild(li);
  }
}

addBooks();