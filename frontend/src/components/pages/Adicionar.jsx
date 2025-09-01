import React from "react";
import { useState } from "react";

function Adicionar() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [nome, setNome] = useState(null);
  const [endereco, setEndereco] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("endereco", endereco);
    if (selectedImg) {
      formData.append("foto", selectedImg);
    }

    try {
      const response = await fetch(
        "https://beautybyonetouch.onrender.com/api/estabelecimentos",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Dados enviados com sucesso!", data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <>
      <div className="justify-self-center items-center my-10 bg-white rounded-4xl p-4 text-xs max-w-80 sm:text-base flex flex-col sm:max-w-md">
        <h1 className="text-2xl font-light py-4 sm:text3xl">
          Adicionar meu trabalho
        </h1>
        <input
          className="border-b-2 border-b-pink-300 w-full my-2 focus:outline-none"
          type="text"
          placeholder="Nome do seu estabelecimento"
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border-b-2 border-b-pink-300 w-full my-2 focus:outline-none"
          type="text"
          placeholder="Endereço"
          onChange={(e) => setEndereco(e.target.value)}
        />
        <input
          className="border-2 rounded-full border-pink-300 p-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out"
          type="file"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImg(event.target.files[0]);
          }}
        />
        {selectedImg && (
          <div className="max-w-60">
            <img src={URL.createObjectURL(selectedImg)} alt="not found" />
            <button
              className="border-2 rounded-full border-pink-300 p-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out"
              onClick={() => setSelectedImg(null)}
            >
              remove
            </button>
          </div>
        )}
        <button className="border-2 rounded-full border-pink-300 px-5 py-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out"
        onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </>
  );
}

export default Adicionar;
