import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar/Navbar';
import List from './pages/List';
import Contact from './pages/Contact';
import useLocalStorage from 'use-local-storage';

export function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <Navbar changeTheme={() => switchTheme} theme={theme} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<List />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
