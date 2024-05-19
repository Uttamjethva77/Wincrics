const express = require('express');
const usersroute = require('./routes/usersroutes');
const blogsRoute = require('./routes/blogsroutes');
const adminroute = require('./routes/adminroutes')
const paymentroute = require('./routes/paymentsroutes')
const packagesRoute = require('./routes/packagesroute')
const videoroute = require('./routes/videosroutes')
const adminLog = require('./routes/adminlogin')
const notificationRoute = require('./routes/notificationroute')
const winningRoute = require('./routes/winningsroute')
const cors = require('cors');
const analyticsRoute = require('./routes/analytics')
const otpRoute = require('./routes/otproute')
const otpemail = require('./routes/otpemail')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersroute);
app.use('/adminlogin',adminLog);
app.use('/winnings',winningRoute);
app.use('/blogs', blogsRoute);
app.use('/admin', adminroute);
app.use('/notification', notificationRoute)
app.use('/payment',paymentroute)
app.use('/analytics', analyticsRoute);
app.use('/otp', otpRoute);
app.use('/otpemail', otpemail);
app.use('/packagess', packagesRoute)
app.use('/videos',videoroute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});