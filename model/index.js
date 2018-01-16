let fs = require('fs');
let path = require('path');
let crypto = require('crypto');
let filePath = path.join(__dirname, 'data.json');

function createId() {
  let newId = crypto.randomBytes(8).toString('hex');
  let db = JSON.parse(fs.readFileSync(filePath));
  let existingIds = db.reduce((ex, book) => {
    ex.push(book.id);
    book.authors.forEach(author => ex.push(author.id));
    return ex;
  }, []);
  while (!existingIds.includes(newId)) {
    newId = crypto.randomBytes(8).toString('hex');
  }
  return newId;
}

//NOT TESTED
function createBook(data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let { name, borrowed, description, authors } = data;
  if (name && borrowed !==undefined && authors) {
    if (name.length <= 30) {
      authors = authors.map(author => {
        authName = author.split(' ');
        return { id: createId(), firstName: authName[0], lastName: authName[1] };
      });
      let newBook = { id: createId(), name, borrowed, description, authors };
      db.books.push(newBook);
      fs.writeFileSync(filePath, JSON.stringify(db));
      return newBook;
    }
    return { message: 'Invalid input: Name longer than 30 chraacters.'};
  }
  return { message: 'Inavlid input: Missing fields.'};
}

//WORKS!
function getAllBooks() {
  let db = JSON.parse(fs.readFileSync(filePath));
  return db;
}

//WORKS!
function getBook(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let bookFound = db.find(book => book.id === id);
  if (bookFound) {
    return bookFound;
  }
  return { message: 'Book not found.' };
}

//NOT TESTED
function updateBook(id, data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let bookToUpdate = getBook(id);
  if (bookToUpdate.message) {
    return bookToUpdate;
  }
  let { name, borrowed, description, authors } = data;
  if (name && borrowed !== undefined && description && authors) {
    bookToUpdate.name = name;
    bookToUpdate.borrowed = borrowed;
    bookToUpdate.description = description;
    bookToUpdate.authors = authors;
    fs.writeFileSync(filePath, JSON.stringify(db));
    return bookToUpdate;
  }
  return { message: 'Inavlid input: Missing fields.' };
}

//NOT TESTED
function deleteBook(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let deletedBook = getBook(id);
  if (deletedBook.message) {
    return deletedBook;
  }
  let i = db.indexOf(deletedBook);
  db.splice(i, 1);
  fs.writeFileSync(filePath, JSON.stringify(db));
  return deletedBook;
}

//NOT TESTED OR UPDATED
function createAuthor(data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let { firstName, lastName } = data;
  if (firstName && lastName) {
    let newAuthor = { id: createId, firstName, lastName };
    db.authors.push(newAuthor);
    fs.writeFileSync(filePath, JSON.stringify(db));
    return newAuthor;
  }
  return { message: 'Invalid input: Missing fields.' };
}

//WORKS!
function getAllAuthors() {
  let db = JSON.parse(fs.readFileSync(filePath));
  let authors = db.reduce((authList, book) => {
    book.authors.forEach(author => authList.push(author));
    return authList;
  }, []);
  return authors;
}

//WORKS!
function getAuthor(id) {
  let authors = getAllAuthors();
  let authorFound = authors.find(author => author.id === id);
  if (authorFound) {
    return authorFound;
  }
  return { message: 'Author not found.' };
}

//NOT TESTED
function updateAuthor(id, data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let authorToUpdate = getAuthor(id);
  if (authorToUpdate.message) {
    return authorToUpdate;
  }
  let { firstName, lastName } = data;
  if (firstName && lastName) {
    authorToUpdate.firstName = firstName;
    authorToUpdate.lastName = lastName;
    fs.writeFileSync(filePath, JSON.stringify(db));
    return authorToUpdate;
  }
  return { message: 'Inavlid input: Missing fields.' }
}

//NOT TESTED
function deleteAuthor(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let deletedAuthor = getAuthor(id);
  if (deletedAuthor.message) {
    return deletedAuthor;
  }
  let i = db.authors.indexOf(deletedAuthor);
  db.authors.splice(i, 1);
  fs.writeFileSync(filepath, JSON.stringify(db));
  return deletedAuthor;
}

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  createAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
};
