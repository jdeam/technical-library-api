let fs = require('fs');
let path = require('path');
let crypto = require('crypto');
let filePath = path.join(__dirname, 'data.json');

function seedDB() {
  let db = JSON.parse(fs.readFileSync(filePath));
  db.books[0].authors[0] = db.authors[0];
  db.books[1].authors[0] = db.authors[1];
  db.books[2].authors[0] = db.authors[2];
  db.books[2].authors[1] = db.authors[3];
  db.books[3].authors[0] = db.authors[4];
  db.books[3].authors[1] = db.authors[5];
  db.books[4].authors[0] = db.authors[6];
  let newDB = db.books;
  fs.writeFileSync(filePath, JSON.stringify(newDB));
}

seedDB();

function createId() {
  let newId = crypto.randomBytes(8).toString('hex');
  let db = JSON.parse(fs.readFileSync(filePath));
  let existingIds = db.books.map(book => book.id)
    .concat(db.authors.map(author => author.id));
  while (!existingIds.includes(newId)) {
    newId = crypto.randomBytes(8).toString('hex');
  }
  return newId;
}

function createBook(data) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let { name, borrowed, description, authors } = data;
  if (name && borrowed !==undefined && authors) {
    if (name.length <= 30) {
      let newBook = { id: createId(), name, borrowed, description, authors };
      db.books.push(newBook);
      let existingAuthors = db.authors
        .map(author => `${author.firstName} ${author.lastName}`);
      authors.forEach(author => {
        if (!existingAuthors.includes(author)) {
          let authName = author.split(' ');
          let newAuthor = {
            id: createId(),
            firstName: authName[0],
            lastName: authName[1]
          }
        }
      });
      fs.writeFileSync(filePath, JSON.stringify(db));
      return newBook;
    }
    return { message: 'Invalid input: Name longer than 30 chraacters.'};
  }
  return { message: 'Inavlid input: Missing fields.'};
}

function getAllBooks() {
  let db = JSON.parse(fs.readFileSync(filePath));
  return db.books;
}

function getBook(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let bookFound = db.books.find(book => book.id === id);
  if (bookFound) {
    return bookFound;
  }
  return { message: 'Book not found.' };
}

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

function deleteBook(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let deletedBook = getBook(id);
  if (deletedBook.message) {
    return deletedBook;
  }
  let i = db.books.indexOf(deletedBook);
  db.books.splice(i, 1);
  fs.writeFileSync(filePath, JSON.stringify(db));
  return deletedBook;
}

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

function getAllAuthors() {
  let db = JSON.parse(fs.readFileSync(filePath));
  return db.authors;
}

function getAuthor(id) {
  let db = JSON.parse(fs.readFileSync(filePath));
  let authorFound = db.authors.find(author => author.id === id);
  if (authorFound) {
    return authorFound;
  }
  return { message: 'Author not found.' };
}

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
