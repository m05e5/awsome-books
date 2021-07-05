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
let num_id = 1;

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
    let id = num_id;
    num_id ++;
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
    const title = document.createTextNode(book.title);
    const author = document.createTextNode(book.author);
    li.appendChild(title);
    li.appendChild(br);
    li.appendChild(author);
    li.appendChild(br);
    li.appendChild(remove_btn);
    li.appendChild(br);
    li.appendChild(br);
    li.appendChild(hr);
    books.appendChild(li);
  }
}

addBooks();