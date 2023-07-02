import React from 'react';
import Excluir from '../../Assets/delete.svg'
import Editar from '../../Assets/editar.svg'
import api from "../../services/api";
import './index.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function PacienteDetalhes({ paciente }) {
  const [modal, setModal] = useState(false);

  const handleExcluirPaciente = async () => {
    try {
      await api.delete(`/api/pacientes/${paciente.id}`);
      toast.success('Paciente excluído com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 700);
      } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
const handleExclusaoConfirmada = () => {
    handleExcluirPaciente();
    setModal(false);
  };

  return (
    <div className="detalhes-card">
    <div className="detalhes-info">
      <div className="info-item">
        <strong>Paciente:</strong> 
        <span>{paciente.nome}</span>
      </div>
      <div className="info-item">
        <strong>Email:</strong> 
        <span>{paciente.email}</span>
      </div>
      <div className="detalhes-info">
        <div className="info-item">
          <strong>CPF:</strong>
          <span>{paciente.cpf}</span>
        </div>
      </div>
    </div>
    <div className="detalhes-info">
      <div className="info-item">
      <Link to={`/paciente/editar/${paciente.id}`}>
        <button>
         <img src={Editar} alt="editar" />
       </button>
       </Link>
       <button onClick={()=> setModal(!modal)}>
         <img src={Excluir} alt="cancelamento" />
       </button>
      </div>
      {modal && (
      <div className="confirm-delete">
        <span>Apagar item?</span>
        <div className="box-confirm">
          <button type="button" onClick={() => handleExclusaoConfirmada()}>
            Sim
          </button>
          <button type="button" onClick={() => setModal(false)}>
            Não
          </button>
        </div>
      </div>
      )}
    </div>
  </div>
  );
}

export default PacienteDetalhes;
