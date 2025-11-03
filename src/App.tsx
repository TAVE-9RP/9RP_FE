import { Route, Routes } from 'react-router-dom';
import Main from '@/pages/main/MainPage';
import SignupStartPage from './pages/signup/SignupStartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="signup" element={<SignupStartPage />} />
    </Routes>
  );
}

export default App;
