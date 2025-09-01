import React from "react";
import { Link } from "react-router-dom";

const ObjSec = ({ estabelecimento }) => {
  if (!estabelecimento) {
    return null;
  }
  return (
    <Link to={`/estabelecimento/${estabelecimento._id}`} className="max-w-full">
      <div className="bg-white rounded-md px-2 py-2 max-w-2xs">
        <img src={estabelecimento.foto} alt={estabelecimento.nome} className="rounded-md" />
        <div>
          <p>{estabelecimento.nome}</p>
        </div>
        <div>
          <p className="truncate">
            {estabelecimento.endereco}
          </p>
        </div>
        <div>
          <p>
            {estabelecimento.numero}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ObjSec;