
import { NavLink } from "react-router-dom"
import "./index.css"
import Logo from '../../Assets/logo.png'

function Menu(){
    return(
        <div className="menu">
            <img    src={Logo} alt="logo e-cormercial" />
            <ul className="menu-bar">
                    <li><NavLink to="/" exact className="btn-menu" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/consulta" className="btn-menu" exact activeClassName="active">Consultas</NavLink></li>
                    <li><NavLink to="/medico" className="btn-menu" exact activeClassName="active">Medicos</NavLink></li>
                    <li><NavLink to="/paciente" className="btn-menu" exact activeClassName="active">Pacientes</NavLink></li>          
            </ul>
        </div>

    )

}export default Menu