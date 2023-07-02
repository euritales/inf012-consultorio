
import { NavLink } from "react-router-dom"
import "./index.css"

function Menu(){
    return(
        <ul>
            <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/consulta" exact activeClassName="active">Consultas</NavLink></li>
            <li><NavLink to="/medico" exact activeClassName="active">Medicos</NavLink></li>
            <li><NavLink to="/paciente" exact activeClassName="active">Pacientes</NavLink></li>          
        </ul>
    )

}export default Menu