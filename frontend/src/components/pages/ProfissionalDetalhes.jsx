import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfissionalDetalhes = () => {
  const { id } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profissionais/${id}`);
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
    <div>
      <img src={profissional.fotoUrl} alt={profissional.nomeDoLugar} />
      <h1>{profissional.nomeDoLugar}</h1>
      <p>{profissional.descricao}</p>
      
      <h2>Horários Disponíveis:</h2>
      {horarios.length > 0 ? (
        <ul>
          {horarios.map(horario => (
            <li key={horario._id}>
              {horario.data} - Horários: {horario.horariosDisponiveis.join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum horário disponível no momento.</p>
      )}
    </div>
  );
};

export default ProfissionalDetalhes;