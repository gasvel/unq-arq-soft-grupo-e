import React from 'react';
import Listado from './listado/Listado';
import CrearProducto from './crearProducto/CrearProducto';
import Header from './header/Header';
import './App.css';
import RegistrarUsuario from './registerUser/RegistrarUsuario';
import Login from './login/Login';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        screen: 'login'
    }

}

  handleProductCreation = () => {
    alert('Producto Creado');
  }

  handleLogin = () =>{
    this.setState({screen: 'list'})
  }

  handleCreationScreen = () => {
    this.setState({screen: 'createProduct'});
  }

  handleHomeScreen = () => {
    this.setState({screen: 'login'});
  }

  handleRegisterScreen = () => {
    this.setState({screen: 'createUser'});
  }

  render(){
    if(this.state.screen === 'login' && localStorage.getItem("user") !== null){
      this.setState({screen: "list"});
    }
    let mainContent;
    switch(this.state.screen){
      case 'createProduct':
        mainContent = <CrearProducto onProductCreated={this.handleProductCreation}/>;
        break;
      case 'createUser':
        mainContent = <RegistrarUsuario onUserCreated={this.handleHomeScreen}/>;
        break
      case 'list':
        mainContent = <Listado/>;
        break
      default:
        mainContent = <Login onUserLogin={this.handleLogin}/>;
        break;

    }
    return (
    <div className="App">
      <Header onProductCreationEvent={this.handleCreationScreen} onHome={this.handleHomeScreen} onRegister={this.handleRegisterScreen}/>
      {mainContent}

    </div>
  );
  }
}

export default App;
