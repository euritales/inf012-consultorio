import React, { useState } from 'react';
import '../../styles/cards.css'
import '../../styles/global.css'
import '../../styles/form.css'
import { format } from 'date-fns';
import Excluir from '../../Assets/delete.svg'
import api from '../../services/api';
import { toast } from 'react-toastify';



const ConsultaDetalhes = ({ consulta }) => {
  const [modal, setModal] = useState(false);
  const { paciente, medico } = consulta;
  const [cancelamento, setMotivoCancelamento] = useState('');
  const data = format(new Date(consulta.dataHora), 'dd/MM/yyyy');
  const hora = format(new Date(consulta.dataHora), 'HH:mm');
  const cancelamentoFormat = consulta.cancelamento ? consulta.cancelamento.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';

//corrigido
  const handleExcluirPaciente = async () => {
    const body = {
      cancelamento: cancelamento
    };
    if(body.cancelamento === ""){
      toast.error('Selecione um motivo para o cancelamento');
      return;
    }
    try {
      await api.delete(`/api/consultas/${consulta.id}`,{data:body});
      toast.success('Consulta excluída com sucesso!');
      console.log();
      setTimeout(() => {
        window.location.reload();
      }, 700);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Ocorreu um erro ao excluir a consulta.");
        }
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
          <strong>Paciente:</strong> {paciente.nome}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {paciente.email}
        </div>
        <div className="info-item">
          <strong>CPF:</strong> {paciente.cpf}
        </div>
      </div>
      <div className="detalhes-info">
        <div className="info-item">
          <strong>Médico:</strong> {medico.nome}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {medico.email}
        </div>
        <div className="info-item">
          <strong>CRM:</strong> {medico.crm}
        </div>
        <div className="info-item">
          <strong>Especialidade:</strong> {medico.especialidade}
        </div>
      </div>
      <div className="detalhes-info">
      <div className="info-item">
      <strong>Data: </strong>{data}
      <br />
      <strong>Hora:</strong>{hora}
      </div>
        <div className="info-item">
          <strong>Status:</strong>
          {consulta.cancelamento ? 'Cancelado' : "Ativo" }
        </div>
        {consulta.cancelamento ?
        
        <div className="info-item">
          <strong>Motivo:</strong>
          <p className='cancelado'
          style={{ fontSize: '12px'}}>
            {cancelamentoFormat}
            </p>
        </div> : 
        <div className="info-item">
          <button onClick={()=> setModal(!modal)}>
            <img src={Excluir} alt="cancelamento" />
          </button>
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
            <div>
              <select value={cancelamento} onChange={(e) => setMotivoCancelamento(e.target.value)}>
                <option value="">Selecione o motivo de cancelamento</option>
                <option value="PACIENTE_DESISTIU">Paciente desistiu</option>
                <option value="MEDICO_CANCELOU">Médico cancelou</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>
          </div>
        </div>
      )}
        </div>
        }
      </div>
    </div>
  );
};

export default ConsultaDetalhes;