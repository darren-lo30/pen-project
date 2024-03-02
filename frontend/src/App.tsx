import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import { authenticate } from './api/auth';
import { setUser } from './redux/reducers/userReducer';
import './socket';
import {ROUTES} from './routes';

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
        {
          ROUTES.map(route => (
            <Route path={route.path} element={<route.page />} />
          ))
        }
      </Routes>
    </Router>
  )
}

export default App
