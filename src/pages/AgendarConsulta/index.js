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
        toast.error('A data selecionada deve ser posterior à data atual.');
        return;
      }


      const body = {
        paciente: {
          id: data.paciente
        },
        dataHora: data.dataHora
      };
    
      if (data.medico) {
        body.medico = {
          id: data.medico
        };
      }
      console.log(data)
      try{
        api.post("/api/consultas",body)
         toast.success("Consulta agendada com sucesso!")
         setTimeout(() => {
          navigate(`/consulta`);
        }, 300);
      }catch(e){
        toast.error(e.response.data.message);
      }
    };
  
    return (
    <div className="container-form-paciente">
      <div className="container-register-paciente">
      <form className="patient-form" onSubmit={handleSubmit(onSubmit)}>

      <div className="container-unic-input ">
            <label htmlFor="pacientes">Pacientes</label>
            <select
              {...register("paciente")}
              id="paciente_id"
              className="select"
            >
              <option value="" required disabled selected hidden>
                Selecione um Paciente
              </option>
              {pacientes.map(({ id, nome }) => (
                <option key={id} value={id}>
                  {nome}
                </option>
              ))}
            </select>
          </div>
          <div className="container-unic-input ">
            <label htmlFor="medicos">Medicos</label>
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
          <label htmlFor="telefone">Data/Hora</label>
          <input type="datetime-local" 
          id="dataHora" 
          {...register('dataHora', {required: true})} />
        <button className="btn " type="submit">Cadastrar</button>
      </form>
      </div>
      </div>
    );
  };
  
  export default AgendarConsulta;