import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from "../../services/api";
import '../../styles/form.css'
import './index.css'
import { toast } from 'react-toastify';

const EditarMedico = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const response = await api.get(`/api/medicos/${id}`);
        const medico = response.data;
        setValue('nome', medico.nome);
        setValue('email', medico.email);
        setValue('telefone', medico.telefone);
        setValue('crm', medico.crm);
        setValue('especialidade', medico.especialidade);
        setValue('endereco.logradouro', medico.endereco.logradouro);
        setValue('endereco.numero', medico.endereco.numero);
        setValue('endereco.complemento', medico.endereco.complemento);
        setValue('endereco.bairro', medico.endereco.bairro);
        setValue('endereco.cidade', medico.endereco.cidade);
        setValue('endereco.uf', medico.endereco.uf);
        setValue('endereco.cep', medico.endereco.cep);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar o Medico:', error);
      }
    };

    fetchMedico();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data)
    const body = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        crm: data.crm,
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
      await api.put(`/api/medicos/${id}`, body);
      toast.success("Medico atualizado com sucesso!")
      setTimeout(() => {
        navigate(`/medico/${id}`);
      }, 300);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Editar Medico</h2>
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
          <label htmlFor="especialidade">Especialidade</label>
          <input type="text" id="especialidade" {...register('especialidade', {required: true})} />
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
        <button onClick={()=> navigate('/medico')}>Voltar</button>

      </form>
    </div>
  );
};

export default EditarMedico;
