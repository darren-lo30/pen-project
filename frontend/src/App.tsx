import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CanvasPage from './pages/CanvasPage';
import { useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import { authenticate } from './api/auth';
import { setUser } from './redux/reducers/userReducer';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch user
    (async() => {
      try {
        const res = await authenticate();
        dispatch(setUser(res.data.user));
      } catch (e) { /* Don't do anything */ }
    })();
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<CanvasPage />} />
      </Routes>
    </Router>
  )
}

export default App