import React, { useEffect, useState } from "react";
import ObjSec from "../ObjSec";

function Home() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstabelecimentos = async () => {
      try {
        const response = await fetch("https://beautybyonetouch.onrender.com/api/estabelecimentos");
        if (!response.ok) {
          throw new Error('Falha ao buscar estabelecimentos');
        }
        const data = await response.json();
        setEstabelecimentos(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os estabelecimentos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstabelecimentos();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page-container">
      {estabelecimentos.length > 0 ? (
        estabelecimentos.map(estabelecimento => (
          <ObjSec 
            key={estabelecimento._id} 
            nome={estabelecimento.nome} 
            endereco={estabelecimento.endereco} 
            foto={estabelecimento.foto} 
          />
        ))
      ) : (
        <div>Nenhum estabelecimento encontrado.</div>
      )}
    </div>
  );
}

export default Home;