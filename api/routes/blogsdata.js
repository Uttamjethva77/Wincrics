// In your blogsdata.js route file
const express = require('express');
const { getAllBlogsData } = require('../controller/Blogsdata');

const blogdata = express.Router();

blogdata.get('/', async (req, res) => {
  try {
    const blogsData = await getAllBlogsData();
    res.json(blogsData);
  } catch (error) {
    console.error('Error fetching blogs data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = blogdata;
