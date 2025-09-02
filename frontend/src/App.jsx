import Home from './components/pages/Home';
import Header from './components/Header';
import EstabelecimentoDetalhes from './components/pages/EstabelecimentoDetalhes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Adicionar from './components/pages/Adicionar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/estabelecimento/:id' element={<EstabelecimentoDetalhes />} />
          <Route path='/adicionar' element={<Adicionar/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;