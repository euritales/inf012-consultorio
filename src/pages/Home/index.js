import { useEffect, useState } from "react";
import { Component } from "react";
import "./index.css" 
import fotoconsulta from "../../Assets/fotoconsulta.jpg"
import fotomedico from "../../Assets/fotomedico.jpg"
import fotopaciente from "../../Assets/fotopaciente.jpg"
import { NavLink } from "react-router-dom"
import React from 'react';


function Home(){

        function botaoConsulta() {   
            window.location.href = 'http://localhost:3000/consulta/cadastro';
        }

        function botaoMedico() {   
            window.location.href = 'http://localhost:3000/medico/cadastro';
            }

        function botaoPaciente() {   
            window.location.href = 'http://localhost:3000/paciente/cadastro';
        }
    
      return(
        <div class="gallery">
            <div className="box-img">
                <img src={fotoconsulta} 
                alt="Consultas" 
                title="Agende Consultas"           
                />
                <ul>
                  <li><NavLink to="/consulta/cadastro" exact activeClassName="active">Agendar Consulta</NavLink></li>
                </ul>
            </div>
            <div className="box-img">
                <img src={fotomedico} 
                alt="Medicos" 
                title="Cadastre Médicos" 
                />
                <ul>
                  <li><NavLink to="/medico/cadastro" exact activeClassName="active">Cadastrar Medico</NavLink></li>
                </ul>
            </div>
            <div className="box-img">
                <img src={fotopaciente} 
                alt="Pacientes" 
                title="Cadastre Pacientes"
                />
                <ul>
                  <li><NavLink to="/paciente/cadastro" exact activeClassName="active">Cadastrar Paciente</NavLink></li>
                </ul>
            </div>
        </div>
           )  
    
     
   
   
}export default Home;
        
        
    
    

