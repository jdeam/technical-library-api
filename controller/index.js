let model = require('../model');

function createBook(req, res) {
  let newBook = model.createBook(req.body);
  if (newBook.error) {
    let { error, message } = newBook;
    return res.status(error).json({ error: { message } });
  }
  res.status(201).json({ data: newBook });
}

function getAllBooks(req, res) {
  return res.status(200).json({ data: model.getAllBooks() });
}

function getBook(req, res) {
  let bookFound = model.getBook(req.params.id);
  if (bookFound.error) {
    let { error, message } = bookFound;
    return res.status(error).json({ error: { message } });
  }
  res.status(200).json({ data: bookFound });
}

function updateBook(req, res) {
  let updatedBook = model.updateBook(req.params.id, req.body);
  if (updatedBook.error) {
    let { error, message } = updatedBook;
    return res.status(error).json({ error: { message } });
  }
  res.status(200).json({ data: updatedBook });
}

function deleteBook(req, res) {
  let deletedBook = model.deleteBook(req.params.id);
  if (deletedBook.error) {
    let { error, message } = deletedBook
    return res.status(error).json({ error: { message } });
  }
  res.status(200).json({ data: deletedBook });
}

/////////////////////////////////////////////////////////////

function createAuthor(req, res) {
  let newAuthor = model.createAuthor(req.params.id, req.body);
  if (newAuthor.error) {
    let { error, message } = newAuthor
    return res.status(error).json({ error: { message } });
  }
  res.status(201).json({ data: newAuthor });
}

function getAllAuthors(req, res) {
  let authors = model.getAllAuthors(req.params.id);
  if (authors.errors) {
    let { error, message } = authors;
    return res.status(error).json({ error: { message }});
  }
  res.status(200).json({ data: authors });
}

function getAuthor(req, res) {
  let authorFound = model.getAuthor(req.params.id, req.params.authId);
  if (authorFound.error) {
    let { error, message } = authorFound;
    return res.status(error).json({ error: { message} });
  }
  res.status(200).json({ data: authorFound });
}

function updateAuthor(req, res) {
  let updatedAuthor = model.updateAuthor(req.params.id, req.params.authId, req.body);
  if (updatedAuthor.error) {
    let { error, message } = updatedAuthor;
    return res.status(error).json({ error: { message } });
  }
  return res.status(200).json({ data: updatedAuthor });
}

function deleteAuthor(req, res) {
  let deletedAuthor = model.deleteAuthor(req.params.id, req.params.authId);
  if (deletedAuthor.error) {
    let { error, message } = deletedAuthor;
    return res.status(error).json({ error: { message } });
  }
  res.status(200).json({ data: deletedAuthor });
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
