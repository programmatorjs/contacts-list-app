import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { env } from 'node:process';
import { sequelize } from './db.js';
import UserController from './controllers/userController.js';


const port = env.PORT || 3003;

const app = express();
app.use(cors());

app.use(express.static('build/static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1.0/contacts', UserController.getAllContacts);

app.get('/api/v1.0/contacts/:search', UserController.getContactBySearch);

app.post('/api/v1.0/contacts/', UserController.createContact);

app.patch('/api/v1.0/contacts/:id', UserController.updateContact);

app.delete('/api/v1.0/contacts/:id', UserController.deleteContact);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
