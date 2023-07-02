import { useForm } from "react-hook-form";
import '../../styles/form.css'
import '../../styles/global.css'
import './index.css'
import api from "../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CadastroMedico = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (dado) => {

      const body = {
        nome: dado.nome,
        email: dado.email,
        telefone: dado.telefone,
        crm: dado.crm,
        especialidade: dado.especialidade,
        endereco: {
          logradouro: dado.endereco.logradouro,
          numero: dado.endereco.numero,
          complemento: dado.endereco.complemento,
          bairro: dado.endereco.bairro,
          cidade: dado.endereco.cidade,
          uf: dado.endereco.uf,
          cep: dado.endereco.cep
      }
    }

    try{
      api.post("api/medicos",body)
       toast.success("Médico cadastrado com sucesso!")
       setTimeout(() => {
        navigate(`/medico`);
      }, 500);
    }catch(e){
      toast.error(e.response.data.message);
    }
    
    };
  
    return (
    <div className="container-form-paciente">
      <div className="container-register-paciente">
      <form className="patient-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-unic-input">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" {...register('nome', {required: true})} />
        </div>
        <div className="container-unic-input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email', {required: true})} />
        </div>
        <div className="container-unic-input">
          <label htmlFor="telefone">Telefone</label>
          <input type="tel" id="telefone" {...register('telefone', {required: true})} />
        </div>
        <div className="container-unic-input">
          <label htmlFor="crm">CRM</label>
          <input type="text" id="crm" {...register('crm', {required: true})} />
        </div>
        <div className="container-unic-input">
          <select id="especialidade" {...register('especialidade')}>
            <option value="DERMATOLOGIA">Dermatologia</option>
            <option value="GINECOLOGIA">Ginecologia</option>
            <option value="ORTOPEDIA">Ortopedia</option>
            <option value="CARDIOLOGIA">Cardiologia</option>
          </select>
        </div>
        <div className="container-double-form">
        <div>
          <label htmlFor="logradouro">Logradouro</label>
          <input type="text" id="logradouro" {...register('endereco.logradouro')} />
        </div>
        <div>
          <label htmlFor="numero">Número</label>
          <input type="text" id="numero" {...register('endereco.numero')} />
        </div>
        <div>
          <label htmlFor="complemento">Complemento</label>
          <input type="text" id="complemento" {...register('endereco.complemento')} />
        </div>
        <div>
          <label htmlFor="bairro">Bairro</label>
          <input type="text" id="bairro" {...register('endereco.bairro')} />
        </div>
        <div>
          <label htmlFor="cidade">Cidade</label>
          <input type="text" id="cidade" {...register('endereco.cidade')} />
        </div>
        <div>
          <label htmlFor="uf">UF</label>
          <input type="text" id="uf" {...register('endereco.uf')} />
        </div>
        <div>
          <label htmlFor="cep">CEP</label>
          <input type="text" id="cep" {...register('endereco.cep')} />
        </div>
        </div>
        
        <button type="submit">Cadastrar</button>
      </form>
      </div>
      </div>
    );
  };
  
  export default CadastroMedico;