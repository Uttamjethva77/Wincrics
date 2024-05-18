
import './App.css';
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import Admin from './pages/adminpages/Admin';
import Video from './pages/adminpages/Video';
import Analytics from './pages/adminpages/Analytics';
import Packages from './pages/adminpages/Packages';
import Blogs from './pages/adminpages/Blogs';

function App() {
  return (
    <div className="App">
     

     <BrowserRouter>
      <Routes>
        <Route path= '/admin' element={<Admin /> } >
          <Route path='/admin' element={<Video></Video>}></Route>
          <Route path='/admin/analyitics' element={<Analytics></Analytics>}></Route>
          <Route path='/admin/packages' element={<Packages></Packages>}></Route>
          <Route path='/admin/blogs' element={<Blogs></Blogs>}></Route>
        </Route>
       
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
