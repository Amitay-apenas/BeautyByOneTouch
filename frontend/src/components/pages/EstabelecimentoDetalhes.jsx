import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EstabelecimentoDetalhes = () => {
  const { id } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const response = await axios.get(
          `/api/estabelecimento/${id}`
        );
        setProfissional(response.data.data.profissional);
        setHorarios(response.data.data.horarios);
      } catch (err) {
        setError("Não foi possível carregar os detalhes do profissional.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalhes();
  }, [id]);

  if (loading) {
    return <div>Carregando detalhes...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  if (!profissional) {
    return <div>Profissional não encontrado.</div>;
  }

  return (
    <>
      <div className="flex bg-white">
        <div className="">
          <img
            className="max-w-2xl"
            src={profissional.fotoUrl}
            alt={profissional.nomeDoLugar}
          />
        </div>

        <div>
          <div className="my-5">
            <h1 className="text-2xl font-bold">{profissional.nomeDoLugar}</h1>
            <p>{profissional.descricao}</p>
          </div>

          <div>
            <h2 className="text-2xl">Horários Disponíveis:</h2>
            {horarios.length > 0 ? (
              <ul>
                {horarios.map((horario) => (
                  <li className="py-2 border-b-1"key={horario._id}>
                    {horario.data} - Horários:{" "}
                    {horario.horariosDisponiveis.join(", ")}
                    <p>marcar</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum horário disponível no momento.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EstabelecimentoDetalhes;
