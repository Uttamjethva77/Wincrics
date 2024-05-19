const Winning = require('../models/winnings');

class WinningController {
  static async create(req, res) {
    try {
      const winning = await Winning.create(req.body);
      res.status(201).json(winning);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const winnings = await Winning.getAll();
      res.status(200).json(winnings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const winning = await Winning.getById(req.params.id);
      if (!winning) {
        return res.status(404).json({ error: 'Winning not found' });
      }
      res.status(200).json(winning);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const winning = await Winning.update(req.params.id, req.body);
      if (!winning) {
        return res.status(404).json({ error: 'Winning not found' });
      }
      res.status(200).json(winning);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const winning = await Winning.delete(req.params.id);
      if (!winning) {
        return res.status(404).json({ error: 'Winning not found' });
      }
      res.status(200).json(winning);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = WinningController;
