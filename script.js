
const add_btn = document.getElementById('add');
const book = Object.create( {} );
const bookList = [
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

const removeBook = (id) => {
  bookList = bookList.filter(book => book.id !== id)
}