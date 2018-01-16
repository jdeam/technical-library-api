let model = require('../model');

function createBook(req, res) {
  let newBook = model.createBook(req.body);
  if (newBook.message) {
    return res.status(400).json({ error: newBook });
  }
  res.status(201).json({ data: newBook });
}

function getAllBooks(req, res) {
  return res.status(200).json({ data: model.getAllBooks() });
}

function getBook(req, res) {
  let bookFound = model.getBook(req.params.id);
  if (bookFound.message) {
    return res.status(404).json({ error: bookFound });
  }
  res.status(200).json({ data: bookFound });
}

function updateBook(req, res) {
  let updatedBook = model.updateBook(req.params.id, req.body);
  if (updatedBook.message === 'Book not found.') {
    return res.status(404).json({ error: updatedBook });
  }
  if (updateBook.message === 'Inavlid input: Missing fields.') {
    return res.status(400).json({ error: updatedBook });
  }
  res.status(200).json({ data: updatedBook });
}

function deleteBook(req, res) {
  let deletedBook = model.deleteBook(req.params.id);
  if (deletedBook.message) {
    return res.status(404).json({ error: deletedBook });
  }
  res.status(200).json({ data: deletedBook });
}

function createAuthor(req, res) {
  let newAuthor = model.createAuthor(req.body);
  if (newAuthor.message) {
    return res.status(400).json({ error: newAuthor });
  }
  res.status(201).json({ data: newAuthor });
}

function getAllAuthors(req, res) {
  return res.status(200).json({ data: model.getAllAuthors() });
}

function getAuthor(req, res) {
  let authorFound = model.getAuthor(req.params.id);
  if (authorFound.message) {
    return res.status(404).json({ error: authorFound });
  }
  res.status(200).json({ data: authorFound });
}

function updateAuthor(req, res) {
  let updatedAuthor = model.updateAuthor(req.params.id, req.body);
  if (updatedAuthor.message === 'Author not found.') {
    return res.status(404).json({ error: updatedAuthor });
  }
  if (updatedAuthor.message === 'Inavlid input: Missing fields.') {
    return res.status(400).json({ error: updatedAuthor });
  }
  res.status(200).json({ data: updatedAuthor });
}

function deleteAuthor(req, res) {
  let deletedAuthor = model.deleteAuthor(req.params.id);
  if (deletedAuthor.message) {
    return res.status(404).json({ error: deletedAuthor });
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
