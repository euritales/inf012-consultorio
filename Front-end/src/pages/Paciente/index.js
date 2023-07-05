import { useState, useEffect } from 'react';
import PacienteDetalhes from '../../components/PacienteDetalhes';
import api from "../../services/api";
import ReactPaginate from "react-paginate";
import { NavLink } from 'react-router-dom';


export default function Paciente(){

  const [pacientes, setPacientes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const cardsPorPagina = 10;
  const pageCount = Math.ceil(pacientes.length / cardsPorPagina);


  const handlePaginacao = ({ selected }) => {
    setPaginaAtual(selected);
  };
  const indiceInicial = paginaAtual * cardsPorPagina;
  const indiceFinal = indiceInicial + cardsPorPagina;
  const exibirDados = pacientes
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .slice(indiceInicial,indiceFinal);

  useEffect(() => {
    api
      .get("/api/pacientes/all")
      .then((response) => {
        console.log(response)
        setPacientes(response.data.filter((paciente) => paciente.status))
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

return (
  <div className="box-principal flex-cl align-center content-start ">
    <div className="display-flex align-stretch width "> 
      <button >
          <NavLink className="btn btn-white" to="/paciente/cadastro" exact >Cadastrar Paciente</NavLink>
          </button>
      </div>
      <div className="box-secundario flex-cl">
        {exibirDados.map((paciente, index) => (
          <PacienteDetalhes key={index} paciente={paciente} />
        ))}
    </div>
    <div className="btn-paginacao flex flex-row"> 
    <ReactPaginate
    previousLabel={"<<Anterior"}
    nextLabel={"Próximo>>"}
    pageCount={pageCount}
    onPageChange={handlePaginacao}
    />
    </div>
  </div>
);
}
