let express = require('express');
let app = express();
const PORT = process.env.PORT || 3000;

let bodyParser = require('body-parser');
let morgan = require('morgan');
let controller = require('./controller');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.route('/books')
  .get(controller.getAllBooks)
  .post(controller.createBook);

app.route('/books/:id')
  .get(controller.getBook)
  .patch(controller.updateBook)
  .delete(controller.deleteBook);

app.route('/books/:id/authors')
  .get(controller.getAllAuthors)
  .post(controller.createAuthor);

app.route('/books/:id/authors/:authId')
  .get(controller.getAuthor)
  .patch(controller.updateAuthor)
  .delete(controller.deleteAuthor);

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Resouce not found.' } });
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  res.status(status).json({ error: err });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
