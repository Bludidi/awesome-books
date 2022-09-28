// // Getting Elements
// const title = document.querySelector('#title');
// const author = document.querySelector('#author');
// const form = document.getElementById('book-form');
// const library = document.getElementById('library');
// let book;
// let bookList = JSON.parse(localStorage.getItem('bookList')) || [];
// function addBook() {
//   book = {
//     title: title.value,
//     author: author.value,
//     id: Math.floor(Math.random() * 1000000),
//   };
//   bookList.push(book);
//   localStorage.setItem('bookList', JSON.stringify(bookList));
// }
// function removeBook(id) {
//   bookList = bookList.filter((books) => books.id !== id);
//   localStorage.setItem('bookList', JSON.stringify(bookList));
// }

// function populate(book) {
//   const row = document.createElement('tr');
//   const bookTitle = document.createElement('td');
//   const bookAuthor = document.createElement('td');
//   const removeBtn = document.createElement('button');
//   bookTitle.innerText = book.title;
//   bookAuthor.innerText = book.author;
//   removeBtn.innerText = 'Remove';
//   row.append(bookTitle, bookAuthor, removeBtn);
//   library.append(row);
//   removeBtn.addEventListener('click', () => {
//     removeBtn.parentElement.remove();
//     removeBook(book.id);
//   });
// }

// bookList.forEach(populate);

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const alert = document.getElementById('report');
//   function displayAlert() {
//     alert.style.display = 'block';
//   }
//   if (title.value !== '' && author.value !== '') {
//     addBook();
//     populate(book);
//     form.reset();
//   } else {
//     displayAlert();
//     window.setTimeout(() => {
//       window.location.reload();
//     }, 3000);
//   }
// });

import Store from './modules/store.js';
import UI from './modules/ui.js';

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// EVENT TO DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// EVENT TO ADD A BOOK
document.querySelector('.bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // get form values
  const titleInput = document.querySelector('.title').value;
  const authorInput = document.querySelector('.author').value;
  if (titleInput !== '' && authorInput !== '') {
    const book = new Book(titleInput, authorInput);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
  } else {
    // eslint-disable-next-line no-alert
    alert('Please enter book tile and author');
  }
});

// EVENT DELETE
document.querySelector('.books').addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    const id = e.target.previousElementSibling.innerText;
    Store.removeBook(id);
    UI.deleteBook(e.target);
  }
});

const date = document.getElementsByClassName('date')[0];
date.innerText = ` Date: ${new Date().getDate()} | ${new Date().getMonth()} | ${new Date().getFullYear()}`;

const app = {
  pages: [],
  show: new Event('show'),
  init() {
    app.pages = document.querySelectorAll('.page');
    app.pages.forEach((pg) => {
      pg.addEventListener('show', app.pageShown);
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', app.nav);
    });
  },
  nav(ev) {
    ev.preventDefault();
    const currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    document.getElementById(currentPage).dispatchEvent(app.show);
  },
};

document.addEventListener('DOMContentLoaded', app.init);
