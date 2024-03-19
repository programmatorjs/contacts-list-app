import express from 'express';
import DatabaseService from './database-service.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path'

const app = express();
app.use(cors());

const db = new DatabaseService();
app.use(express.static('frontend/build'));



app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

const port = 3000;

app.get('/api/v1.0/contacts', (req, res) => {
  const allData = db.getAll();

  res.send(allData);
});

app.get('/api/v1.0/contacts/:search', (req, res) => {
  const id = req.params.search;

  if (!id) {
    res.status(500);
    res.send({ error: 'Error 500' });
    return;
  }

  const oneItem = db.getOne(id);

  if (!oneItem) {
    res.status(404);
    res.send({ error: `Item with id=${id} not found` });
    return;
  }
  console.log(oneItem);
  res.send(oneItem);
});

app.post('/api/v1.0/contacts/', (req, res) => {
  const data = req.body;

  try {
    const newContact = db.create(data);
    if (!newContact) {
      res.status(500).send({ error: 'Error creating contact' });
      return;
    }
    res.status(201).send(newContact);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.patch('/api/v1.0/contacts/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(500);
    res.send({ error: 'Error 500' });
    return;
  }

  const oneItem = db.getOne(id);

  if (!oneItem) {
    res.status(404);
    res.send({ error: `Item with id=${id} not found` });
    return;
  }

  const data = req.body;

  if (!db.update(id, data)) {
    res.status(500);
    res.send({ error: `Error 500 when updating item with id ${id}` });
    return;
  }

  res.status(200);
  res.send(data);
});

app.delete('/api/v1.0/contacts/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    res.status(500);
    res.send({ error: 'Error 500' });
    return;
  }

  const oneItem = db.getOne(id);

  if (!oneItem) {
    res.status(404);
    res.send({ error: `Item with id=${id} not found` });
    return;
  }

  if (db.delete(id)) {
    res.status(204);
    res.end();
  } else {
    res.status(500);
    res.send({ error: `Error 500 when deleting item with id ${id}` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});