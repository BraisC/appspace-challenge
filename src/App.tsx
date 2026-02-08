import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CharacterList } from './pages/CharacterList';
import { CharacterDetail } from './pages/CharacterDetail';
import { Layout } from './layout';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
