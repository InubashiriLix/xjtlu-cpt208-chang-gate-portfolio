import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AboutPage from './pages/AboutPage';
import ExplorePage from './pages/ExplorePage';
import HomePage from './pages/HomePage';
import PostcardPage from './pages/PostcardPage';
import SpotDetailPage from './pages/SpotDetailPage';
import StampsPage from './pages/StampsPage';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/spots/:slug" element={<SpotDetailPage />} />
        <Route path="/stamps" element={<StampsPage />} />
        <Route path="/postcard" element={<PostcardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

