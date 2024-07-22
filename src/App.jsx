import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login/login';
import Notification from './components/ToastNotifications/Notification';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Notification/>
    </BrowserRouter>
  )
}

export default App
