import React, { useEffect, useState } from "react";
import ObjSec from "../ObjSec";

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
    <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 px-8 py-4">
      {estabelecimentos.length > 0 ? (
        estabelecimentos.map((estabelecimento) => (
          <ObjSec 
            key={estabelecimento._id}
            profissional={{
              _id: estabelecimento._id,
              nomeDoLugar: estabelecimento.nome,
              descricao: estabelecimento.endereco,
              fotoUrl: estabelecimento.foto,
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