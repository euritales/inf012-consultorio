import { useForm } from "react-hook-form";
import '../../styles/form.css'
import '../../styles/global.css'
import '../../styles/buttons.css'
import './index.css'
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from 'react-toastify';
import { isBefore } from 'date-fns';



const AgendarConsulta = () => {
  const { register, handleSubmit } = useForm();
  const [pacientes, setPacientes] = useState([])
  const [medicos, setMedicos] = useState([])
  const navigate = useNavigate();


    
    useEffect(() => {
      api
        .get("/api/pacientes/all")
        .then((response) => setPacientes(response.data
        .filter((paciente) => paciente.status)
        .sort((a, b) => a.nome.localeCompare(b.nome))))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
        api
        .get("/api/medicos/all")
        .then((response) => setMedicos(response.data
        .filter((medico) => medico.status)
        .sort((a, b) => a.nome.localeCompare(b.nome))))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });

    }, []);

    const onSubmit = async (data) => {
      const currentDate = new Date();
      const selectedDate = new Date(data.dataHora);
    
      if (isBefore(selectedDate, currentDate)) {
        toast.error('A data selecionada não deve ser posterior à data atual.');
        return;
      }
      //Correcao
      // Correção de retorno regra de negicio
      console.log(data)
      const body = {
        paciente: {
          id: data.paciente
        },
        medico: {
          id: data.medico
        },
        dataHora: data.dataHora
      };
    
      try {
        const response = await api.post("/api/consultas", body);
        toast.success("Consulta agendada com sucesso!");
        setTimeout(() => {
          navigate(`/consulta`);
        }, 300);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Ocorreu um erro ao agendar a consulta.");
        }
      }
    };
    
    return (
  <div className="box-principal flex-cl align-center content-start ">
    <div className="container-form-paciente">
      <div className="container-register-paciente">
      <form className="patient-form flex" onSubmit={handleSubmit(onSubmit)}>

      <div className="container-unic-input mg-x-m">
            <label htmlFor="pacientes">Pacientes</label>
            <select
              {...register("paciente")}
              id="paciente_id"
              className="select"
            >
              <option 
              value="" required disabled selected hidden>
                Selecione um Paciente
              </option>
              {pacientes.map(({ id, nome }) => (
                <option key={id} value={id}>
                  {nome}
                </option>
              ))}
            </select>
          </div>
          <div className="container-unic-input mg-x-m ">
            <label 
       
            htmlFor="medicos">Medicos</label>
              <select
                {...register("medico")}
                id="medico_id"
                className="select"
              >
                <option value=""  selected hidden>
                  -- Selecione um Medico -- 
                </option>
                {medicos.map(({ id, nome }) => (
                  <option key={id} value={id}>
                    {nome}
                  </option>
                ))}
              </select>
          </div>
          <div className="container-unic-input mg-x-m">

          <label htmlFor="datetime-local">Data/Hora</label>
          <input type="datetime-local" 
          id="dataHora" 
          style={{ width: '222px'}}
          {...register('dataHora', {required: true})} />
      </div>

        <button className="btn-confirma  btn-white " type="submit">Agendar</button>
      </form>
      </div>
      </div>
    </div>
    );
  };
  
  export default AgendarConsulta;