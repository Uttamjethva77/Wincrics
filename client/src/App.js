import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from './pages/adminpages/Admin';
import Video from './pages/adminpages/Video';
import Analytics from './pages/adminpages/Analytics';
import Packages from './pages/adminpages/Packages';
import Blogs from './pages/adminpages/Blogs';
import Payment from './pages/adminpages/Payment';
import Users from './pages/adminpages/Users';
import Login from './pages/adminpages/Login';
import Winnings from './pages/adminpages/Winnings'
import AdminUsers from './pages/adminpages/AdminUsers';
import ContactUs from './pages/adminpages/Contactus'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Route for login page */}
          <Route path="/admin" element={<Login />} />
          
          {/* Nested routes under /admin */}
          <Route path="/admin/*" element={<Admin />}>
            <Route path="videos" element={<Video />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="packages" element={<Packages />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="payment" element={<Payment />} />
            <Route path="users" element={<Users />} />
            <Route path="adminusers" element={<AdminUsers />} />
            <Route path="winnings" element={<Winnings />} />
            <Route path="contactus" element={<ContactUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
