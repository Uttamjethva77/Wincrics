// controllers/PackageController.js

const Package = require('../models/package');

class PackageController {
    static async create(req, res) {
        try {
          const newPackage = await Package.create(req.body);
          res.status(201).json(newPackage);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

  static async getAll(req, res) {
    try {
      const packages = await Package.getAll();
      res.status(200).json(packages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const packageData = await Package.getById(req.params.id);
      if (!packageData) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.status(200).json(packageData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const updatedPackage = await Package.update(req.params.id, req.body);
      if (!updatedPackage) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.status(200).json(updatedPackage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deletedPackage = await Package.delete(req.params.id);
      if (!deletedPackage) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.status(200).json(deletedPackage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PackageController;
