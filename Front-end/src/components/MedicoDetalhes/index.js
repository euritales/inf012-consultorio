import React from 'react';
import '../../styles/cards.css'
import '../../styles/global.css'
import '../../styles/form.css'
import Excluir from '../../Assets/delete.svg'
import Editar from '../../Assets/editar.svg'
import { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function MedicoDetalhes({ medico }) {
  const [modal, setModal] = useState(false);

  const handleExcluirPaciente = async () => {
    try {
      await api.delete(`/api/medicos/${medico.id}`);
      toast.success('Medico excluído com sucesso!')
      console.log('Medico excluído com sucesso!');
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
          <strong>Médico:</strong> 
          <span>{medico.nome}</span>
        </div>
        <div className="info-item">
          <strong>Email:</strong> 
          <span>{medico.email}</span>
        </div>
        <div className="detalhes-info">
          <div className="info-item">
            <strong>CRM:</strong>
            <span>{medico.crm}</span>
          </div>
        <div className="detalhes-info">
          <div className="info-item">
           <strong>Especialidade:</strong> 
            <span>{medico.especialidade}</span>
          </div>
        </div>
      </div>
      </div>
      <div className="detalhes-info">
      <div className="info-item">
      <Link to={`/medico/editar/${medico.id}`}>
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

export default MedicoDetalhes;
