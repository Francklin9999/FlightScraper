import Home from './components/Home';
import Search from './components/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className='App'>

      <header>
        <Header />
      </header>

      <Router>

        <main>

          <Routes>

            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Home />} />

          </Routes>

        </main>

      </Router>

      <footer>
        <Footer />
      </footer>

    </div>
  );
};

export default App;
