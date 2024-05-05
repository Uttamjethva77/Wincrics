const express = require('express');
const usersroute = require('./routes/usersroutes');
const blogsRoute = require('./routes/blogsroutes');
const adminroute = require('./routes/adminroutes');
const package1 = require('./routes/packagesRoute');
const analyticsRoute = require('./routes/analytics')
const app = express();

app.use(express.json());
app.use('/users', usersroute);
app.use('/blogs', blogsRoute);
app.use('/admin', adminroute);
app.use('/analytics', analyticsRoute);
app.use('/package',package1);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});