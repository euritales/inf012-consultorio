import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from "../../services/api";
import './index.css'
import { toast } from 'react-toastify';

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await api.get(`/api/pacientes/${id}`);
        const paciente = response.data;
        setValue('nome', paciente.nome);
        setValue('email', paciente.email);
        setValue('telefone', paciente.telefone);
        setValue('cpf', paciente.cpf);
        setValue('endereco.logradouro', paciente.endereco.logradouro);
        setValue('endereco.numero', paciente.endereco.numero);
        setValue('endereco.complemento', paciente.endereco.complemento);
        setValue('endereco.bairro', paciente.endereco.bairro);
        setValue('endereco.cidade', paciente.endereco.cidade);
        setValue('endereco.uf', paciente.endereco.uf);
        setValue('endereco.cep', paciente.endereco.cep);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar o paciente:', error);
      }
    };

    fetchPaciente();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data)
    const body = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        endereco: {
          logradouro: data.endereco.logradouro,
          numero: data.endereco.numero,
          complemento: data.endereco.complemento,
          bairro: data.endereco.bairro,
          cidade: data.endereco.cidade,
          uf: data.endereco.uf,
          cep: data.endereco.cep
        }
    }

    try {
      await api.put(`/api/pacientes/${id}`, body);
      toast.success('Paciente atualizado com sucesso!');
      setTimeout(() => {
        navigate(`/pacientes/${id}`);
      }, 300);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Editar Paciente</h2>
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
        <button className="btn " type="submit">Cadastrar</button>
        <button onClick={()=> navigate('/paciente')}>Voltar</button>

      </form>
    </div>
  );
};

export default EditarPaciente;
