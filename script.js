
const add_btn = document.getElementById('add');
const book = Object.create( {} );
let bookList = [
    {
      id: 1,
      title: 'lorem ipsu',
      author: 'testeroo testyy'
    },
    { 
      id: 2,
      title: 'Second book',
      author: 'testeroo testyy'
    }
];

add_btn.addEventListener('click', () => {
    book.id = bookList.length + 1;
    book.title = document.getElementById('title').value;
    book.author = document.getElementById('author').value;
    bookList.push(book);
})

function removeBook(id) {
  bookList = bookList.filter(book => book.id !== id)
}

const books = document.getElementById('books');
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
