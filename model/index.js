let fs = require('fs');
let path = require('path');
let shortid = require('shortid');
let filePath = path.join(__dirname, 'data.json');

function createBook(data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let { name, borrowed, description } = data;
  if (name && typeof borrowed === 'boolean') {
    if (name.length <= 30) {
      let newBook = {
        id: shortid.generate(),
        authors: [],
        name,
        borrowed,
        description
      };
      db.push(newBook);
      fs.writeFileSync(filePath, JSON.stringify(db));
      return newBook;
    }
    return {
      error: 400,
      message: 'Invalid input: Name longer than 30 characters.'
    };
  }
  return { error: 400, message: 'Inavlid input: Missing fields.'};
}

function getAllBooks() {
  let db = JSON.parse(fs.readFileSync(filePath));
  return db;
}

function getBook(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let bookFound = db.find(book => book.id === id);
  if (bookFound) {
    return bookFound;
  }
  return { error: 404, message: 'Book not found.' };
}

function updateBook(id, data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let bookToUpdate = getBook(id);
  if (bookToUpdate.error) {
    return bookToUpdate;
  }
  let i = db.findIndex(book => book.id === id);
  let { name, borrowed, description } = data;
  if (name) { bookToUpdate.name = name };
  if (typeof borrowed === 'boolean') { bookToUpdate.borrowed = borrowed };
  if (description) { bookToUpdate.description = description };
  db[i] = bookToUpdate;
  fs.writeFileSync(filePath, JSON.stringify(db));
  return bookToUpdate;
}

function deleteBook(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let deletedBook = getBook(id);
  if (deletedBook.error) {
    return deletedBook;
  }
  let i = db.findIndex(book => book.id === id);
  db.splice(i, 1);
  fs.writeFileSync(filePath, JSON.stringify(db));
  return deletedBook;
}

/////////////////////////////////////////////////////////////

function createAuthor(id, data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let bookToUpdate = getBook(id);
  if (bookToUpdate.error) {
    return bookToUpdate;
  }
  let { firstName, lastName } = data;
  if (firstName && lastName) {
    let newAuthor = { id: shortid.generate(), firstName, lastName };
    let i = db.findIndex(book => book.id === id);
    db[i].authors.push(newAuthor);
    fs.writeFileSync(filePath, JSON.stringify(db));
    return newAuthor;
  }
  return { error: 400, message: 'Invalid input: Missing fields.' };
}

function getAllAuthors(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let bookFound = getBook(id);
  if (bookFound.error) {
    return bookFound;
  }
  return bookFound.authors;
}

function getAuthor(id, authId) {
  let authors = getAllAuthors(id);
  if (authors.error) {
    return authors;
  }
  let authorFound = authors.find(author => author.id === authId);
  if (authorFound) {
    return authorFound;
  }
  return { error: 404, message: 'Author not found.' };
}

function updateAuthor(id, authId, data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let authorToUpdate = getAuthor(id, authId);
  if (authorToUpdate.error) {
    return authorToUpdate;
  }
  let { firstName, lastName } = data;
  if (firstName) { authorToUpdate.firstName = firstName; }
  if (lastName) {authorToUpdate.lastName = lastName; }
  let i = db.findIndex(book => book.id === id);
  let j = db[i].authors.findIndex(auth => auth.id === authId);
  db[i].authors[j] = authorToUpdate;
  fs.writeFileSync(filePath, JSON.stringify(db));
  return authorToUpdate;
}

function deleteAuthor(id, authId) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let authorToDelete = getAuthor(id, authId);
  if (authorToDelete.error) {
    return authorToDelete;
  }
  let i = db.findIndex(book => book.id === id);
  let j = db[i].authors.findIndex(auth => auth.id === authId);
  db[i].authors.splice(j, 1);
  fs.writeFileSync(filePath, JSON.stringify(db));
  return authorToDelete;
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
