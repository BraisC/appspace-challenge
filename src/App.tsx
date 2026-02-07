import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CharacterList } from './pages/CharacterList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<div />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
