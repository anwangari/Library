const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    if (this.read === "yes") {
        infoLog = "read";
    } else infoLog = "not read yet";

    this.info = `${this.id} ` + ` ${this.title}` + ' by ' + `${this.author}` + ', ' + `${this.pages}` + ' pages, ' + `${infoLog}` + '.';
}

// DOM elements
const newBookBtn = document.querySelector('#newBookBtn');
const bookModal = document.querySelector('#bookModal');
const bookForm = document.querySelector('#bookForm');
const cancelBtn = document.querySelector('#cancelBtn');
const booksContainer = document.querySelector('#booksContainer');
const totalBooksSpan = document.querySelector('#totalBooks');
const booksReadSpan = document.querySelector('#booksRead');
const booksRemainingSpan = document.querySelector('#booksRemaining');

// Event listeners
newBookBtn.addEventListener('click', () => {
    bookModal.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
    bookModal.style.display = 'none';
    bookForm.reset();
});

window.addEventListener('click', (e) => {
    if (e.target === bookModal) {
        bookModal.style.display = 'none';
        bookForm.reset();
    }
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

// Functions
function addBookToLibrary() {
    const title = document.querySelector('#bookTitle').value;
    const author = document.querySelector('#bookAuthor').value;
    const pages = document.querySelector('#bookPages').value;
    const read = document.querySelector('#bookRead').value;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayBooks();
    updateStatistics();
    bookModal.style.display = 'none';
    bookForm.reset();
}

function displayBooks() {
    booksContainer.innerHTML = '';

    if (myLibrary.length === 0) {
        booksContainer.innerHTML = '<div class="no-books">No books added yet. Click "New Book" to get started!</div>';
        return;
    }

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-pages">${book.pages} pages</div>
            <div class="book-status ${book.read === 'yes' ? 'read' : 'not-read'}">
                ${book.read === 'yes' ? 'Read' : 'Not Read'}
            </div>
            <div class="book-actions">
                <button class="toggle-read" onclick="toggleReadStatus(${index})">
                    ${book.read === 'yes' ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button class="delete-book" onclick="deleteBook(${index})">Delete</button>
            </div>
        `;
        booksContainer.appendChild(bookCard);
    });
}

function toggleReadStatus(index) {
    myLibrary[index].read = myLibrary[index].read === 'yes' ? 'no' : 'yes';
    displayBooks();
    updateStatistics();
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
    updateStatistics();
}

function updateStatistics() {
    const total = myLibrary.length;
    const read = myLibrary.filter(book => book.read === 'yes').length;
    const remaining = total - read;

    totalBooksSpan.textContent = total;
    booksReadSpan.textContent = read;
    booksRemainingSpan.textContent = remaining;
}

// Initialize
displayBooks();
updateStatistics();