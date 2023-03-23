import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CafeList, { Cafe } from './components/CafeList';
import NewCafe from './components/NewCafe';
import CafeDetails from './components/CafeDetails';

function App() {
  const [cafes, setCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    axios.get(`https://api.sampleapis.com/coffee/hot`)
      .then(response => {
        const data = response.data;
        const cafes = data.map((cafe: any) => ({
          title: cafe.title,
          type: cafe.type
        }));
        setCafes(cafes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleNewCafe = (newCafe: Cafe) => {
    setCafes([...cafes, newCafe]);
  };

  const handleFilteredCafes = (updatedCafes: Cafe[]) => {
    setCafes(updatedCafes);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CafeList cafes={cafes} setFilteredCafes={handleFilteredCafes} />} />
        <Route path="/new-cafe" element={<NewCafe handleNewCafe={handleNewCafe} />} />
        <Route path="/cafe/:title" element={<CafeDetails cafes={cafes} setFilteredCafes={handleFilteredCafes} />} />
      </Routes>
    </Router>
  );
}

export default App;
