import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/adminpages/Admin";
import Video from "./pages/adminpages/Video";
import Analytics from "./pages/adminpages/Analytics";
import Packages from "./pages/adminpages/Packages";
import Blogs from "./pages/adminpages/Blogs";
import Payment from "./pages/adminpages/Payment";
import Users from "./pages/adminpages/Users";
import Login from "./pages/adminpages/Login";
import Winnings from "./pages/adminpages/Winnings";
import AdminUsers from "./pages/adminpages/AdminUsers";
import Register from "./pages/userpages/Register";
import Loginuser from "./pages/userpages/Login";
import ResponsiveAppBar from "./pages/userpages/Home";
import Videos from "./pages/userpages/Videos";
import Userpackages from "./pages/userpages/Packages";
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

          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="login" element={<Loginuser></Loginuser>}></Route>
          <Route path="/" element={<ResponsiveAppBar></ResponsiveAppBar>}>
            <Route path="/videos" element={<Videos></Videos>}></Route>
            <Route path="/blog" element={<div><h1>blog</h1></div>}></Route>
            <Route path="/winnings" element={<h1>winnings</h1>}></Route>
            <Route path="/packages" element={<Userpackages></Userpackages>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
