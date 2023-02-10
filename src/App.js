import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/LoginPage';
import UserListing from './components/UserListing';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserListing />} />
          <Route path="/login" element={<Login />} />
          <Route path='/user/create' element={<UserCreate/>} />
          <Route path='/user/edit/:userId' element={<UserEdit/>} />
          <Route path='/user/details/:userId' element={<UserDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
