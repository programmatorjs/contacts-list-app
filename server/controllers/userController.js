import { Sequelize } from 'sequelize';
import User from '../models/models.js';

class UserController {
  //Create
  async createContact(req, res) {
    try {
      const { name, phone } = req.body;
      const user = User.build({ name, phone });
      await user.save();
      console.log('New user has been saved');
      res.send(user);
    } catch (e) {
      console.error('ERROR:', e);
      return false;
    }
  }
  // Read
  async getAllContacts(req, res) {
    try {
      const allContacts = await User.findAll();
      res.send(allContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
  // Read
  async getContactBySearch(req, res) {
    try {
      const search = req.params.search;
      const contact = await User.findOne({
        where: { [Sequelize.Op.or]: [{ phone: search }, { name: search }] },
      });
      if (!contact) {
        res.status(404).send({ error: 'Contact not found' });
        return;
      }

      res.send([contact]);
    } catch (error) {
      console.error('Error searching contact:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  //update
  async updateContact(req, res) {
    try {
      const id = req.params.id;
      const { name, phone } = req.body;
      const contact = await User.findByPk(id);
      if (!contact) {
        res.status(404).send({ error: 'Contact not found' });
        return;
      }
      await contact.update({ name, phone });
      res.send(contact);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  //delete
  async deleteContact(req, res) {
    try {
      const id = req.params.id;
      const contact = await User.findByPk(id);
      if (!contact) {
        res.status(404).send({ error: 'Contact not found' });
        return;
      }

      await contact.destroy();
      res.send({ message: 'Contact deleted successfully' });
    } catch (e) {
      console.error('Error deleting contact:', e);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
