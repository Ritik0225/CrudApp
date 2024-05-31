
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register.jsx';
import Login from './components/login/Login.jsx';
import CurdTable from './components/curdTable/CurdTable.jsx';
import AddUser from './components/addUser/AddUser.jsx';
import EditUser from './components/editUser/EditUser.jsx';
function App() {
  return (
  
  <>
    <BrowserRouter>
    <Routes>
      <Route path='/' exact Component={Register} />
      <Route path='/login' exact Component={Login}/>
      <Route path='/register' exact Component={Register}/>
      <Route path='/curdApp' exact Component={CurdTable} />
      <Route path='/addUser' exact Component={AddUser}/>
      <Route path='/editUser/:id' exact Component={EditUser}/>
      </Routes>
     </BrowserRouter>
  </>
  );
}

export default App;
