const ContactUs = require('../models/contactus');

class ContactUsController {
  static async create(req, res) {
    try {
      const contact = await ContactUs.create(req.body);
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const contacts = await ContactUs.getAll();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const contact = await ContactUs.getById(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const contact = await ContactUs.update(req.params.id, req.body);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const contact = await ContactUs.delete(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ContactUsController;
