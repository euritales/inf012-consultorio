
// import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import { toast } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import '../../styles/global.css'
import '../../styles/form.css'
import api from "../../services/api";
import MedicoDetalhes from '../../components/MedicoDetalhes';
import { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import { NavLink } from 'react-router-dom';



const Medico = () => {

  const [medicos, setMedicos] = useState([])

  const [paginaAtual, setPaginaAtual] = useState(0);
  const cardsPorPagina = 10;
  const pageCount = Math.ceil(medicos.length / cardsPorPagina);


  const handlePaginacao = ({ selected }) => {
    setPaginaAtual(selected);
  };
  const indiceInicial = paginaAtual * cardsPorPagina;
  const indiceFinal = indiceInicial + cardsPorPagina;
  const exibirDados = medicos
  .sort((a, b) => a.nome.localeCompare(b.nome))
  .slice(indiceInicial,indiceFinal);

  useEffect(() => {
    api
      .get("/api/medicos/all")
      .then((response) => setMedicos(response.data.filter((paciente) => paciente.status)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

   return(
    <>
    <ul>
      <li><NavLink to="/medico/cadastro" exact className="btn-redirec">Cadastrar Medico</NavLink></li>
    </ul>
    <div className="consultaBox">
        {exibirDados.map((medico, index) => (
          <MedicoDetalhes key={index} medico={medico} />
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
};
  
  export default Medico;