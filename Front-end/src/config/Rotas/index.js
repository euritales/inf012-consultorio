import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../../pages/Home"
import Error from "../../pages/Error"
import Menu from "../../components/Menu"
import Medico from "../../pages/Medico"
import Paciente from "../../pages/Paciente"
import Consulta from "../../pages/Consulta"
import { ToastContainer } from "react-toastify"
import CadastroPaciente from "../../pages/CadastroPaciente"
import CadastroMedico from "../../pages/CadastroMedico"
import AgendarConsulta from "../../pages/AgendarConsulta"
import EditarPaciente from "../../pages/EditarPaciente"
import EditarMedico from "../../pages/EditarMedico"


function Rotas(){
    return(
        <BrowserRouter>
        <ToastContainer/>
           <Menu/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/medico" exact element={<Medico/>}/>
                <Route path="/medico/cadastro" exact element={<CadastroMedico/>}/>
                <Route path="/medico/editar/:id" exact element={<EditarMedico/>}/>
                <Route path="/paciente" exact element={<Paciente/>}/>
                <Route path="/paciente/cadastro" exact element={<CadastroPaciente/>}/>
                <Route path="/paciente/editar/:id" exact element={<EditarPaciente/>}/>
                <Route path="/consulta" exact element={<Consulta/>}/>
                <Route path="/consulta/cadastro" exact element={<AgendarConsulta/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )

}export  default Rotas