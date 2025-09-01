import React from "react";
import { Link } from "react-router-dom"; // Se você estiver usando react-router-dom

const ObjSec = ({ profissional }) => {
  if (!profissional) {
    return null;
  }
  return (
    <Link to={`/profissional/${profissional._id}`} className="max-w-full">
      <div className="bg-white rounded-md px-2 py-2">
        <img src={profissional.fotoUrl} alt={profissional.nomeDoLugar} className="rounded-md" />
        <div>
          <p>{profissional.nomeDoLugar}</p>
        </div>
        <div>
          <p className="truncate">
            {profissional.descricao}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ObjSec;