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
import Winningsuser from "./pages/userpages/Winnings";
import ContactUs from "./pages/adminpages/Contactus";
import Profile from "./pages/userpages/Profile";
import Policy from "./pages/userpages/Policy";
import Billing from "./pages/userpages/Billing";
import Terms from "./pages/userpages/Terms";
import About from "./pages/userpages/About";
import Contact from "./pages/userpages/Contact";
import ForgotPassword from './pages/userpages/Forgetpassword'

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
          <Route path="forgetpassword" element={<ForgotPassword></ForgotPassword>}></Route>
          <Route path="/" element={<ResponsiveAppBar></ResponsiveAppBar>}>
            <Route path="/videos" element={<Videos></Videos>}></Route>
            <Route
              path="/blog"
              element={
                <div>
                  <h1>blog</h1>
                </div>
              }
            ></Route>
            <Route
              path="/winnings"
              element={<Winningsuser></Winningsuser>}
            ></Route>
            <Route
              path="/packages"
              element={<Userpackages></Userpackages>}
            ></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/terms" element={<Terms></Terms>}></Route>
            <Route path="/policy" element={<Policy></Policy>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path="/billing" element={<Billing></Billing>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
