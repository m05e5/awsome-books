
const add_btn = document.getElementById('add');
const book = Object.create( {} );
const bookList = [
    {
        title: 'lorem ipsu',
        author: 'testeroo testyy'
    },
    {
        title: 'Second book',
        author: 'testeroo testyy'
    }
];

add_btn.addEventListener('click', () => {
    book.title = document.getElementById('title').value;
    book.author = document.getElementById('author').value;
    bookList.push(book);
})