import Home from './components/Home';
import Search from './components/Search';
import './App.css';

function App() {

  return (
    <>
      <Router>

        <Routes>

          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />

        </Routes>

      </Router>
    </>
  );
};

export default App;
