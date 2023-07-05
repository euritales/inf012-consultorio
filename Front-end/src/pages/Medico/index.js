
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
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
      <div className="box-principal flex-cl align-center content-start ">
        <div className="display-flex align-stretch width ">
          <button >
            <NavLink className="btn btn-white" to="/medico/cadastro" exact >Cadastrar Medico</NavLink>
            </button>
        </div>
        <div className="box-secundario flex-cl">
        {exibirDados.map((medico, index) => (
          <MedicoDetalhes key={index} medico={medico} />
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
};
  
  export default Medico;