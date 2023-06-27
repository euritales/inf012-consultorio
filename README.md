# inf012-consultorio
<h1 align="center" id="topo">Olá, seja bem vindo(a) à API E-Medical</h1>
Esse projeto consiste em uma API para gerenciar consultas medicas. Efetuamos a aplicação por meio de Spring Boot, usando CRUDs de Pacientes, Medicos, para que possam ser agendadas e canceladas as consultas. Para o banco de dados utilizamos o H2.


<h3 id="RQFuncionais">Requisitos Funcionais</h3>
<hr>
Os requisitos funcionais desta API estão divididos em três entidades: Medico, Paciente e Consulta. este sistema possibilita:
<h3>Medico:</h3>
<ul>
		<li>Cadastro de Medico: </li>
  O sistema deve possuir uma funcionalidade de cadastro de médicos, na qual as seguintes informações deverão ser preenchidas:
      <ul>
        - Nome <br/>
        - E-mail <br/>
        - Telefone <br/>
        - CRM <br/>
        - Especialidade (Ortopedia, Cardiologia, Ginecologia ou Dermatologia) <br/>
        - Endereço completo (logradouro, número, complemento, bairro, cidade, UF e CEP) <br/>
      </ul>
  Todas as informações são de preenchimento obrigatório, exceto o número e o complemento do endereço.
</ul>
<ul>
		<li>Listagem de Medicos: </li>
  O sistema deve possuir uma funcionalidade de listagem de médicos, na qual as seguintes informações, de cada um dos médicos cadastrados, deverão ser exibidas:
      <ul>
        - Nome <br/>
        - E-mail <br/>
        - CRM <br/>
        - Especialidade (Ortopedia, Cardiologia, Ginecologia ou Dermatologia) <br/>
        A listagem deve ser ordenada pelo nome do médico, de maneira crescente, bem como ser paginada, trazendo 10 registros por página. <br/>
      </ul>
</ul>

<ul>
		<li>Editar Medico: </li>
O sistema deve possuir uma funcionalidade de atualização de dados cadastrais de médicos, na qual as seguintes informações poderão ser atualizadas:
    <ul>
        - Nome <br/>
        - Telefone <br/>
        - Endereço <br/>
    </ul>
    <ul>
As seguintes regras de negócio devem ser validadas pelo sistema:
        - Não permitir a alteração do e-mail do médico; <br/>
        - Não permitir a alteração do CRM do médico; <br/>
        - Não permitir a alteração da Especialidade do médico;  <br/>
      </ul>
  </ul>
      

<ul>
		<li>Excluiir Medico: </li>
O sistema deve possuir uma funcionalidade que permita a exclusão de médicos cadastrados.
As seguintes regras de negócio devem ser validadas pelo sistema:      
  <ul>
        - A exclusão não deve apagar os dados do médico, mas torná-lo como "inativo" no sistema. <br/>
  </ul>
</ul>  
</ul>
