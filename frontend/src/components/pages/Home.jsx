import React, { useState, useEffect } from "react";
import axios from "axios";
import ObjSec from "../ObjSec";

const Home = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await axios.get(
          "/api/profissionais"
        );

        console.log(response);
        
        setProfissionais(response.data.data);
      } catch (err) {
        setError("Não foi possível carregar os profissionais.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfissionais();
  }, []);
  if (loading) {
    return (
      <section className="text-center mt-20 text-white">Carregando...</section>
    );
  }

  if (error) {
    return (
      <section className="text-center mt-20 text-red-500">
        Erro: {error}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-4 gap-8">
      {profissionais.map((profissional) => (
        <ObjSec key={profissional._id} profissional={profissional} />
      ))}
    </section>
  );
};

export default Home;
