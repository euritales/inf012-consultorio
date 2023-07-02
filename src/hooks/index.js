import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Paginacao({ dados, componente }) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const pacientesPorPagina = 10;

  const pageCount = Math.ceil(dados.length / pacientesPorPagina);

  const handlePaginacao = ({ selected }) => {
    setPaginaAtual(selected);
  };

  const indiceInicial = paginaAtual * pacientesPorPagina;
  const indiceFinal = indiceInicial + pacientesPorPagina;
  const exibirDados = dados.slice(indiceInicial,indiceFinal);

  return (
    <>
      {exibirDados.map((item, index) => (
        <React.Fragment key={index}>{componente(item)}</React.Fragment>
      ))}
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próxima"}
        pageCount={pageCount}
        onPageChange={handlePaginacao}
      />
    </>
  );
}
