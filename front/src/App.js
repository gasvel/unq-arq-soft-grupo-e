import React from 'react';
import Listado from './listado/Listado';
import CrearProducto from './crearProducto/CrearProducto';
import Header from './header/Header';
import './App.css';
import RegistrarUsuario from './registerUser/RegistrarUsuario';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        screen: 'list'
    }

}

  handleProductCreation = () => {
    alert('Producto Creado');
  }

  handleCreationScreen = () => {
    this.setState({screen: 'createProduct'});
  }

  handleHomeScreen = () => {
    this.setState({screen: 'list'});
  }

  handleRegisterScreen = () => {
    this.setState({screen: 'createUser'});
  }

  render(){
    let mainContent = <Listado/>;
    switch(this.state.screen){
      case 'createProduct':
        mainContent = <CrearProducto onProductCreated={this.handleProductCreation}/>
        break;
      case 'createUser':
        mainContent = <RegistrarUsuario onUserCreated={this.handleHomeScreen}/>
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
