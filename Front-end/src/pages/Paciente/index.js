
// import { toast } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css';
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
  <>
  <ul>
    <li><NavLink to="/paciente/cadastro" exact className="btn-redirec">Cadastrar Paciente</NavLink></li>
  </ul>
  <div className="consultaBox">
    {exibirDados.map((paciente, index) => (
      <PacienteDetalhes key={index} paciente={paciente} />
    ))}
  </div>
  <ReactPaginate
    previousLabel={"<<Anterior"}
    nextLabel={"Próximo>>"}
    pageCount={pageCount}
    onPageChange={handlePaginacao}
  />
</>
);
}
