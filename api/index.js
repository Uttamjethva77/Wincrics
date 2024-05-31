const express = require('express');
const cors = require('cors');
const app = express();

const usersroute = require('./routes/usersroutes');
const blogsRoute = require('./routes/blogsroutes');
const adminroute = require('./routes/adminroutes')
const paymentroute = require('./routes/paymentsroutes')
const packagesRoute = require('./routes/packagesroute')
const videoroute = require('./routes/videosroutes')
const adminLog = require('./routes/adminlogin')
const notificationRoute = require('./routes/notificationroute')
const winningRoute = require('./routes/winningsroute')
const analyticsRoute = require('./routes/analytics')
const otpRoute = require('./routes/otproute')
const otpemail = require('./routes/otpemail')
const userLog = require('./routes/userlogin')
const blogdataRoute = require('./routes/blogsdata') 
const forgot = require('./routes/forgotpassword') 
const updatepassword = require('./routes/updatepassword') 
const contactUsRoute = require('./routes/contactus')

const corsOptions = {
  origin: 'https://wincrics.com',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/users', usersroute);
app.use('/adminlogin', adminLog);
app.use('/userlogin', userLog);
app.use('/winnings', winningRoute);
app.use('/blogs', blogsRoute);
app.use('/admin', adminroute);
app.use('/blogdata', blogdataRoute); 
app.use('/forgotpassword', forgot); 
app.use('/updatepassword', updatepassword);
app.use('/notification', notificationRoute)
app.use('/payment', paymentroute)
app.use('/analytics', analyticsRoute);
app.use('/otp', otpRoute);
app.use('/otpemail', otpemail);
app.use('/packagess', packagesRoute)
app.use('/videos', videoroute);
app.use('/contactus', contactUsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
