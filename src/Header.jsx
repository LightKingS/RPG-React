import "./Header.css";
import { Link, useHistory } from "react-router-dom"
import { ClienteContext } from "./ClienteContext";
import { useContext } from "react";


const Header = () => {

  const cliente = useContext(ClienteContext)
  let history = useHistory();

  const loginLogout = () => {
    cliente.setDados({id: null, nome: "", token: ""});
    history.push("/login")
  }

  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <Link to="/" className="navbar-brand">
        <img
          src="rpgLogo.png"
          alt="Logo Supper"
          width="100"
          className="float-left mr-2"
        />
        <h3>Controle de Jogos</h3>
        <h5>Jogos em Destaque</h5>
      </Link>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item" >
          <span className="nav-link" onClick={loginLogout}>
            <i className="fas fa-user-friends mr-2"></i>
            { cliente.dados.email ? cliente.dados.email + " (sair)" : "(identifique-se)"}
          </span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/graph1">
            Gráfico
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
