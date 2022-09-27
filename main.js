// Getting Elements
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.getElementById('book-form');
const library = document.getElementById('library');
let book;
let bookList = JSON.parse(localStorage.getItem('bookList')) || [];
function addBook() {
  book = {
    title: title.value,
    author: author.value,
    id: Math.floor(Math.random() * 1000000),
  };
  bookList.push(book);
  localStorage.setItem('bookList', JSON.stringify(bookList));
}
function removeBook(id) {
  bookList = bookList.filter((books) => books.id !== id);
  localStorage.setItem('bookList', JSON.stringify(bookList));
}

