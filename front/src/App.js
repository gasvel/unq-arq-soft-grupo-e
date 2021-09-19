import logo from './ml.png';
import search from './lupa.png';
import Listado from './listado/Listado';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="site-header">
        <div className="logo">
          <a href="/">
            <img className="logoImg" src={logo} alt="MercadoTrucho"/>
          </a>
        </div>
        <div className="header-middle-area">
          <nav className="main-nav" id="main-nav">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">Categorias</a>
              </li>
              <li>
                <a href="/">Más vendidos</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="search-account-area">
          <a href="/">
            <img src={search} className="search-img" alt="Buscar"></img>
          </a>
        </div>
      </header>
      <Listado></Listado>
    </div>
  );
}

export default App;
