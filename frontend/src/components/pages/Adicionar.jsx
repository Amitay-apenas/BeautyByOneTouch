import React from "react";
import { useState } from "react";

function Adicionar() {
  
    const [ selectedImg, setSelectedImg ] = useState(null);

    return (
    <>
      <div className="justify-self-center items-center my-10 bg-white rounded-4xl p-4 text-xs max-w-80 sm:text-base sm:max-w-md">
        <h1 className="text-2xl font-light py-4 sm:text3xl">Adicionar meu trabalho</h1>
        <input
          className="border-b-2 border-b-pink-300 w-full my-2 focus:outline-none"
          type="text"
          placeholder="Nome do seu estabelecimento"
        />
        <input
          className="border-b-2 border-b-pink-300 w-full my-2 focus:outline-none"
          type="text"
          placeholder="Endereço"
        />
        <input
          className="border-2 rounded-full border-pink-300 p-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out"
          type="file" onChange={(event) => {
            console.log(event.target.files[0])
            setSelectedImg(event.target.files[0])
          }}
        />
        {selectedImg &&(
            <div className="max-w-60">
                <img src={URL.createObjectURL(selectedImg)} alt="not found" />
                <button className="border-2 rounded-full border-pink-300 p-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out" onClick={() => setSelectedImg(null)}>remove</button>
            </div>
        )}
      </div>
    </>
  );
}

export default Adicionar;
