import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import ConsultaDetalhes from "../../components/ConsultaDetalhes";
import api from "../../services/api";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";



const Consulta = () => {

  const [consultas, setConsultas] = useState([])
  
  const [paginaAtual, setPaginaAtual] = useState(0);
  const cardsPorPagina = 10;
  const pageCount = Math.ceil(consultas.length / cardsPorPagina);


  const handlePaginacao = ({ selected }) => {
    setPaginaAtual(selected);
  };
  const indiceInicial = paginaAtual * cardsPorPagina;
  const indiceFinal = indiceInicial + cardsPorPagina;
  const exibirDados = consultas 
  .sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))
  .slice(indiceInicial,indiceFinal);


  useEffect(() => {
    api
      .get("/api/consultas/all")
      .then((response) => setConsultas(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
    return(
      <div className="box-principal flex-cl align-center content-start ">
        <div className="display-flex align-stretch width ">
          <button >
            <NavLink className="btn btn-white" to="/consulta/cadastro" exact >Agendar Consulta</NavLink>
          </button>
        </div>
         <div className="box-secundario flex-cl">
        {exibirDados.map((consulta, index) => (
          <ConsultaDetalhes key={index} consulta={consulta} />
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
  
  export default Consulta;