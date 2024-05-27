const express = require('express');
const { getAllBlogsData, getBlogById } = require('../controller/Blogsdata');
const { logAnalytics } = require('../middelwear/analytics')
const blogdata = express.Router();
blogdata.use(logAnalytics);
// Route to get all blogs data
blogdata.get('/', async (req, res) => {
  try {
    const blogsData = await getAllBlogsData();
    res.json(blogsData);
  } catch (error) {
    console.error('Error fetching blogs data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get a blog by its ID with selected fields
blogdata.get('/:id', async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await getBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = blogdata;
