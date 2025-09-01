import React, { useEffect, useState } from "react";
import ObjSec from "../ObjSec"; // Importe o componente ObjSec

function Home() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstabelecimentos = async () => {
      try {
        const response = await fetch("/api/estabelecimentos");
        if (!response.ok) {
          throw new Error("Falha ao buscar estabelecimentos");
        }
        const data = await response.json();
        setEstabelecimentos(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os estabelecimentos.");
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
        estabelecimentos.map((estabelecimento) => (
          <ObjSec
            key={estabelecimento._id}
            profissional={{
              _id: estabelecimento._id,
              nomeDoLugar: estabelecimento.nome,
              descricao: estabelecimento.endereco,
              fotoUrl: `https://beautybyonetouch.onrender.com/uploads/${estabelecimento.foto
                .split("/")
                .pop()}`,
            }}
          />
        ))
      ) : (
        <div>Nenhum estabelecimento encontrado.</div>
      )}
    </div>
  );
}

export default Home;
