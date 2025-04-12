import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/forms/auth/Login';
import Register from './components/forms/auth/Register';
import useAuthStore from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
       
        <Route path="/login" element={<Login />} />
       
       <Route path='/regiter' element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
