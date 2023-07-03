import { useForm } from "react-hook-form";
import '../../styles/form.css'
import '../../styles/global.css'
import '../../styles/buttons.css'
import './index.css'
import api from "../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CadastroPaciente = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = async (dado) => {

      const body = {
          nome: dado.nome,
          email: dado.email,
          telefone: dado.telefone,
          cpf: dado.cpf,
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

      try {
        const response = await api.post("/api/pacientes", body);
        toast.success("Paciente cadastrado com sucesso!");
        setTimeout(() => {
          navigate(`/paciente`);
        }, 500);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Ocorreu um erro ao cadastrar o paciente.");
        }
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
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" {...register('cpf', {required: true})} />
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
        <button className="btn btn-white" type="submit">Cadastrar</button>
      </form>
      </div>
      </div>
    );
  };
  
  export default CadastroPaciente;