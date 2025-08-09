import Home from './components/pages/Home';
import Header from './components/Header';
import ProfissionalDetalhes from './components/pages/ProfissionalDetalhes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profissional/:id' element={<ProfissionalDetalhes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;