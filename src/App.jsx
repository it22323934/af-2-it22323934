import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ThemeProvider from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorFallback';
import LoadingSpinner from './components/SuspenseLoadingSpinner';
import About from './pages/About';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const CountryDetail = lazy(() => import('./pages/CountryDetail'));
const Statistics = lazy(() => import('./pages/Statistics'));

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen theme-transition">
          <Navbar />
          <main className="flex-grow pt-16 theme-transition">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="flex items-center justify-center h-[70vh]">
                  <LoadingSpinner />
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/country/:code" element={<CountryDetail />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/about" element={<About/>} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}