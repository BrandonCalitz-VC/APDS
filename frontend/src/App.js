import './App.css';
import NavBar from './layouts/navbar';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import PostList from './pages/postList';
import EditPost from './pages/postEdit';
import PostCreate from './pages/postCreate';
import Register from './pages/register';
import Login from './pages/login';
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BrowserRouter >
          <NavBar />
          <Routes>
            <Route exact path="/" element={<PostList/>}/>
            <Route path='/edit/:id' element={<EditPost/>}/>
            <Route path='/create' element={<PostCreate/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
