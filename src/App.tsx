import './App.css';
import '../tailwind.css';
import '../src/components/features/SideFilter/SideFilter.module.scss';
import '../src/styles/normalize.scss';
import '../src/styles/main.scss';
import '../src/styles/variables.scss';
import '../src/styles/all.min.css';

import Footer from './components/layout/Footer/Footer';
import Navbar from './components/layout/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import 'flowbite';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LibraryIntro from './pages/LibraryIntro/LibraryIntro';
import Items from './pages/Items/Items';
import NotFound from './pages/NotFound/NotFound';
import LoginPage from './pages/Accounts/Login/Login';
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="library-intro/:chosenLibrary" element={<LibraryIntro />} />
        <Route path="library-intro/:chosenLibrary/:type" element={<Items />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="not-found" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
