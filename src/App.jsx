import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Statistics from './pages/Statistics';

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen theme-transition">
          <Navbar />
          <main className="flex-grow pt-16 theme-transition">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:code" element={<CountryDetail />} />
              <Route path="/statistics" element={<Statistics />} />
              {/* Add additional routes here */}
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}