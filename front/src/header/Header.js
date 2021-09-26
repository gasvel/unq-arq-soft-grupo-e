import React from 'react';
import './Header.css';
import logo from '../ml.png';
import search from '../lupa.png';

class CrearProducto extends React.Component{

    goToCreation = () =>{
      this.props.onProductCreationEvent();
    }

    goHome = () => {
      this.props.onHome();
    }

    goToRegister = () =>{
      this.props.onRegister();
    }

    render(){
        return(<header className="site-header">
        <div className="logo">
          <a href="/">
            <img className="logoImg" src={logo} alt="MercadoTrucho"/>
          
          <b>MercadoTrucho</b>
          </a>
        </div>
        <div className="header-middle-area">
          <nav className="main-nav" id="main-nav">
            <ul>
              <li>
              <div class="nav-option" onClick={this.goHome}>Home</div>
              </li>
              <li>
                <div class="nav-option">Categorias</div>
              </li>
              <li>
              <div class="nav-option">Más vendidos</div>
              </li>
              <li>
                <div class="nav-option" onClick={this.goToCreation}>Publicar</div>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="search-and-account">
          <ul>
            <li>
              <img src={search} className="search-img" alt="Buscar"></img>
            </li>
            <li>
            <div class="nav-option" onClick={this.goToRegister}>Registrarme</div>
            </li>
          </ul>
            
            
        </nav>
      </header>)
    }
}
export default CrearProducto;