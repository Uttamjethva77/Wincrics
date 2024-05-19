const Notification = require('../models/notification');

class NotificationController {
  static async create(req, res) {
    try {
      const notification = await Notification.create(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const notifications = await Notification.getAll();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const notification = await Notification.getById(req.params.id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const notification = await Notification.update(req.params.id, req.body);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const notification = await Notification.delete(req.params.id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = NotificationController;
